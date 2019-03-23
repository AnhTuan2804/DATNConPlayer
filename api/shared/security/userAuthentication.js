const jwt = require('jsonwebtoken');
const config = require('config');
const moment = require('moment');
const _ = require('lodash');
const passwordManagement = require('./passwordManagement');
const appConstant = require('../../shared/helpers/appConstant');
const localesUtil = require('../../shared/helpers/localesUtils');
const userModel = require('../db/models/user.model');

async function authenticate(email, password, lang) {
    const user = await userModel.getUserByEmail(email);
    if (user) {
        if (user.is_lock) {
            throw Error(localesUtil.userMessage(lang).LOGIN.ACCOUNT_BLOCKED);
        } else {
            await checkStatusOfUser(user.status, lang);
            const hashPassword = passwordManagement.hashPasswordMd5(password);
            if (user.password !== hashPassword) {
                throw Error(localesUtil.userMessage(lang).LOGIN.PASSWORD_IS_NOT_VALID);
            }
            return user;
        }
    } else {
        throw Error(localesUtil.userMessage(lang).LOGIN.EMAIL_IS_NOT_EXIST);
    }
}

async function checkStatusOfUser(status, lang) {
    if (status === appConstant.USER.STATUS.STOP) {
        throw Error(localesUtil.userMessage(lang).LOGIN.ACCOUNT_BLOCKED);
    }
    return false;
}


function generateToken(user) {
    const now = moment().unix();
    if (user.token) {
        user.token = null;
    }
    const infoUser = _.pick(user, ['name', 'email', 'id']);
    const payload = {
        iat: now,
        exp: now + appConstant.TIME_EXP_TOKEN,
        uid: user.id,
        claims: {
            infoUser
        }
    };
    return jwt.sign(payload, config.jwt.key);
}

function verifyToken(token) {
    const decodedToken = jwt.decode(token);
    if (decodedToken.exp < moment().unix()) {
        throw new Error(localesUtil.userMessage('en').AUTH.INVALID_TOKEN);
    }
    return decodedToken;
}


function verifyCodeResetPassword(time) {
    return (moment().unix() - time) < appConstant.TIME_EXP_RESET_CODE;
}

function verifyEmailActive(time) {
    console.log('aaaaaadddddd', moment().unix() - time)
    return (moment().unix() - time) < appConstant.TIME_EXP_VERIFY_EMAIL;
}

module.exports = {
    authenticate,
    generateToken,
    verifyToken,
    verifyCodeResetPassword,
    verifyEmailActive,
    checkStatusOfUser
}
