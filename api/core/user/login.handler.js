const admin = require('firebase-admin');
const _ = require('lodash');
const TwitterAPI = require('node-twitter-api');
const queryString = require('querystring');

const userAuthentication = require('../../shared/security/userAuthentication');
const encodeDecode = require('../../shared/helpers/encodeDecode');
const configCommom = require('../../shared/helpers/configCommon');
const baseService = require('../../shared/helpers/baseService');
const appConstant = require('../../shared/helpers/appConstant');
const localesUtils = require('../../shared/helpers/localesUtils');

const userModel = require('../../shared/db/models/user.model');

/**
 * Function login user by email
 * @param {*} auth
 * @param {*} lang
 * @param {*} body
 * @returns object user or throw error mesage
 */
const loginUserByEmail = async (auth, lang, body) => {
    if (Number(body.type) !== appConstant.USER.TYPE_ACCOUNT.EMAIL) {
        throw Error(localesUtils.userMessage(lang).LOGIN.LOGIN_FAILED);
    }
    auth = encodeDecode.decode(auth);
    // auth after decode is string 'username:password'
    const email = auth.toString().split(':')[0];
    const password = auth.toString().split(':')[1];
    const user = await userAuthentication.authenticate(email, password, lang);
    return createToken(user);
}

/**
 * Function checklogin by social network
 * @param {*} accessToken
 * @param {*} lang
 * @returns object user or throw error message
 */
const loginUserBySocialNetwork = async (accessToken, lang, body) => {
    switch (Number(body.type)) {
        case appConstant.USER.TYPE_ACCOUNT.FACEBOOK:
            return loginByFacebook(accessToken, lang);
        case appConstant.USER.TYPE_ACCOUNT.TWITTER:
            return loginByTwitter(accessToken, lang);
        case appConstant.USER.TYPE_ACCOUNT.LINE:
            return loginByLine(accessToken, lang);
        default:
            throw Error(localesUtils.userMessage(lang).LOGIN.LOGIN_FAILED);
    }
}

/** ***************************************** Function helper **************************************** */

/**
 * Function login with facebook
 * @param {*} accessToken
 * @param {*} lang
 * @returns
 */
const loginByFacebook = async (accessToken, lang) => {
    const fields = 'id, name, email, about, accounts, link, is_verified, significant_other, relationship_status, website, picture, photos, feed';
    const url = 'https://graph.facebook.com/me/';
    try {
        const response = await baseService.getData(url, null, {
            fields,
            access_token: accessToken
        });
        const user = await checkUserLogin(response.data, appConstant.USER.TYPE_ACCOUNT.FACEBOOK, lang);
        return user;
    } catch (error) {
        throw Error(localesUtils.userMessage(lang).LOGIN.CONNECT_TO_FACEBOOK_FAILED);
    }
}

const twitter = new TwitterAPI({
    consumerKey: configCommom.getTwitter().consumerKey,
    consumerSecret: configCommom.getTwitter().consumerSecret,
    callback: null
});
/**
 * Function login with Twitter
 * @param {*} accessToken
 * @param {*} lang
 * @returns user
 */
const loginByTwitter = async (accessToken, lang) => {
    try {
        const params = {
            include_entities: false,
            skip_status: true,
            include_email: true
        }
        // accessToken is string 'access_token:access_token_secret'
        const token = accessToken.toString().split(':')[0];
        const tokenSecret = accessToken.toString().split(':')[1];
        const dataUser = await new Promise((resolve, reject) => {
            twitter.verifyCredentials(token, tokenSecret, params, (error, data) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(data);
                }
            })
        });
        const user = await checkUserLogin(dataUser, appConstant.USER.TYPE_ACCOUNT.TWITTER, lang);
        return user;
    } catch (error) {
        throw Error(localesUtils.userMessage(lang).LOGIN.CONNECT_TO_TWITTER_FAILED);
    }
}

/**
 * Function login with facebook
 * @param {*} accessToken
 * @param {*} lang
 * @returns
 */
const loginByLine = async (code, lang) => {
    const urlGetAccessToken = 'https://api.line.me/oauth2/v2.1/token';
    const postData = queryString.stringify({
        client_id: configCommom.getLine().client_id,
        client_secret: configCommom.getLine().client_secret,
        code,
        grant_type: configCommom.getLine().grant_type,
        redirect_uri: configCommom.getLine().redirect_uri
    });
    try {
        // Get access_token
        const result = await baseService.postDataFormUrlEncode(urlGetAccessToken, {}, postData);
        // Get profile user
        const url = 'https://api.line.me/v2/profile';
        const header = { Authorization: `Bearer ${result.data.access_token}` };
        const response = await baseService.getData(url, header, null);
        const dataUser = response.data;
        dataUser.id = dataUser.userId;
        const user = await checkUserLogin(dataUser, appConstant.USER.TYPE_ACCOUNT.LINE, lang);
        return user;
    } catch (error) {
        throw Error(localesUtils.userMessage(lang).LOGIN.CONNECT_TO_LINE_FAILED);
    }
}

/**
 * Function check user is exist.
 * @param {*} data
 * @param {*} type
 * @param {*} lang
 * @returns {*} Object user or user and token
 */
const checkUserLogin = async (data, type, lang) => {
    let user = await userModel.getUserBySocialId(data.id, type);
    if (!user) {
        if (data.email) {
            user = await userModel.getUserByEmail(data.email);
            if (user) {
                const socialAccountData = {
                    member_id: user.id,
                    social_id: data.id,
                    type
                }
                await userModel.createSocialAccount(socialAccountData);
                return createToken(user);
            }
        }
        user = filterData(data, type);
        user.status = appConstant.USER.STATUS.ACTIVE;
        const userId = await userModel.create(user);
        const socialAccountData = {
            member_id: userId,
            social_id: data.id,
            type
        }
        await userModel.createSocialAccount(socialAccountData);
        user.id = userId;
        return createToken(user);
    }
    if (user.status) {
        await userAuthentication.checkStatusOfUser(user.status, lang);
    }
    return createToken(user);
}

/**
 * Function filter data from social network
 * @param {*} data
 * @param {*} type
 */
function filterData(data, type) {
    let result;
    switch (type) {
        case appConstant.USER.TYPE_ACCOUNT.FACEBOOK:
            result = {
                name: data.name || null,
                email: data.email || null,
                url_logo: data.picture.data.url || null
            }
            break;
        case appConstant.USER.TYPE_ACCOUNT.TWITTER:
            result = {
                name: data.name || null,
                email: data.email || null,
                url_logo: data.profile_image_url || null
            }
            break
        case appConstant.USER.TYPE_ACCOUNT.LINE:
            result = {
                name: data.displayName || null,
                email: data.email || null,
                url_logo: data.pictureUrl || null
            }
            break;
        default: break;
    }
    return result;
}

/**
 * Function create token
 * @param {*} user // Object user
 * @returns {*} Object user
 */
const createToken = async (user) => {
    const token = await userAuthentication.generateToken(user);
    const customToken = await admin.auth().createCustomToken(user.id);
    const dataTokenUpdate = {
        member_id: user.id,
        token,
        firebase_token: customToken
    };
    await userModel.createToken(dataTokenUpdate);
    return _.omit(_.merge(user, dataTokenUpdate), ['member_id', 'password']);
}

module.exports = {
    loginUserByEmail,
    loginUserBySocialNetwork
};
