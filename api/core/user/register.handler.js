const moment = require('moment');
const _ = require('lodash');
const emailHelper = require('../../shared/helpers/emailHelper');
const passwordManagement = require('../../shared/security/passwordManagement');
const configCommon = require('../../shared/helpers/configCommon');
const encodeDecode = require('../../shared/helpers/encodeDecode');
const localesUtil = require('../../shared/helpers/localesUtils');
const appConstant = require('../../shared/helpers/appConstant');
const userModel = require('../../shareddb/models/user.model');

/**
 * Function register user
 * @param {*} data
 * @param {*} auth 'email:pass' encode
 * @param {*} lang
 */
const registerUser = async (data, auth, lang) => {
    // Check account type: email: 0, facebook: 1, twitter: 2, line 3;
    if (Number(data.type) !== appConstant.USER.TYPE_ACCOUNT.EMAIL) {
        throw Error(localesUtil.userMessage(lang).REGISTER.REGISTER_ACCOUNT_FAILED);
    }
    auth = encodeDecode.decode(auth);
    // Auth after decode is string 'email:password'
    const email = auth.toString().split(':')[0];
    const password = auth.toString().split(':')[1];
    const user = await userModel.getUserByEmail(email);
    if (user) {
        if (user.type === appConstant.USER.TYPE_ACCOUNT.EMAIL) {
            throw Error(localesUtil.userMessage(lang).REGISTER.EMAIL_IS_EXIST);
        }
        const dataUpdate = {
            password: passwordManagement.hashPasswordMd5(password),
            type: appConstant.USER.TYPE_ACCOUNT.EMAIL,
            status: appConstant.USER.STATUS.NEW
        }
        await userModel.update(user.id, dataUpdate);
        sendVerifyEmail(user, lang);
        return _.merge(user, { status: dataUpdate.status });
    }
    data.email = email;
    data.status = appConstant.USER.STATUS.NEW;
    data.password = passwordManagement.hashPasswordMd5(password);
    data.type = appConstant.USER.TYPE_ACCOUNT.EMAIL;
    const result = await createUser(data, lang);
    return result;
}

/** ********************************************* Function helper ************************************** */

/**
 * Function create new user
 * @param {*} data
 * @returns {*} Object
 */
const createUser = async (data, lang) => {
    data.sent_mail_at = moment().unix();
    const userId = await userModel.create(data);
    const user = await userModel.getUserById(userId);
    sendVerifyEmail(user, lang);
    return user;
}

/**
 * Function send verify email for user
 * @param {*} data
 */
const sendVerifyEmail = (data) => {
    const text = `<section style="text-align: center;margin: auto;
                    max-width: 50rem;">
                   
                            <div>
                               <div style="    font-size: 2.5rem;
                               font-weight: 600;
                               color: #424242;
                               padding: 2rem 0;
                               text-transform: uppercase;">
                                  <img style="height:70px" src="${configCommon.getHostWeb()}/assets/images/logo.png">   
                               </div>
                               <div>
                                   <a style="padding: 1rem 2rem;
                                       background: #c70000;
                                       font-size: 1.4rem;
                                       text-decoration: none;
                                       color: #fff;
                                       box-shadow: 0px 10px 0px 0px #8e0000;
                                       margin: 1rem 0;border-radius: 5px;
                                       font-weight: 600;" href=${configCommon.getHostWeb()}/verify-email/${encodeDecode.encode(data.id.toString())}>${localesUtil.userMessage(appConstant.HEADER.LOCALE_ENGLISH).VERIFY.CONFIRM_YOUR_ACCOUNT}</a>
                               </div>
                   
                               <p style="    font-size: 1.2rem;
                               word-wrap: break-word;
                               color: #5a5a5a;
                               margin: 2rem 0; margin: 4rem 0 0;"></p>
                               <div class="footer">
                                       <p style=" text-align: right;
                                       font-size: 2rem;
                                       padding-right: 1rem;    line-height: 1px;">${localesUtil.userMessage(appConstant.HEADER.LOCALE_ENGLISH).VERIFY.BEST_REGARDS}</p>
                                       <p style="text-align: right;
                                       font-size: 2rem;
                                       padding-right: 1rem;    line-height: 1px;">${localesUtil.userMessage(appConstant.HEADER.LOCALE_ENGLISH).VERIFY.DREAMUS_TEAM}</p>
                                   </div>
                           </div>
                          
                       </section>`;
    emailHelper.sendEmail(localesUtil.userMessage(appConstant.HEADER.LOCALE_ENGLISH).VERIFY.VERIFY_ACCOUNT, data.email, null, null, text);
}
module.exports = {
    registerUser
}
