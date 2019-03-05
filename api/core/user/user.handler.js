
const _ = require('lodash');
const localeUtils = require('../../shared/helpers/localesUtils');
const passwordManagement = require('../../shared/security/passwordManagement');
const appConstant = require('../../shared/helpers/appConstant');
const userModel = require('../../shared/models/user.model');


/**
 * Get user information
 * @param {string} token token of user
 * @param {string} lang Language of user
 */
async function getUserByToken(token, lang) {
    const user = await userModel.getUserByToken(token);
    if (!user) {
        throw Error(localeUtils.userMessage(lang).LOGIN.USER_DOES_NOT_EXIST);
    }
    return _.omit(user, ['password']);
}

/**
 * Get user information
 * @param {string} token token of user
 * @param {string} lang Language of user
 */
async function getUserById(id, lang) {
    const user = await userModel.getUserById(id);
    if (!user) {
        throw Error(localeUtils.userMessage(lang).LOGIN.USER_DOES_NOT_EXIST);
    }
    return _.pick(user, ['name', 'id', 'url_logo', 'description', 'location']);
}

async function getListUser(token, lang) {
    const user = await userModel.getUserByToken(token);
    if (!user || user.role !== appConstant.USER.ROLE.ADMIN) {
        throw Error(localeUtils.userMessage(lang).AUTH.PERMISSION_DENIED);
    }
    const listUser = await userModel.getList();
    return _.map(listUser, (User) => {
        return _.omit(User, ['password']);
    })
}

async function getUserDetail(token, idUser, lang) {
    const user = await userModel.getUserByToken(token);
    if (!user) {
        throw Error(localeUtils.userMessage(lang).LOGIN.USER_DOES_NOT_EXIST);
    }
    const matchUser = await userModel.getUserById(idUser);
    if (!matchUser) {
        throw Error(localeUtils.userMessage(lang).LOGIN.USER_DOES_NOT_EXIST);
    } else if (user.id !== matchUser.id) {
        if (user.role === appConstant.USER.ROLE.ADMIN) {
            return _.omit(matchUser, ['passowrd']);
        }
        throw Error(localeUtils.userMessage(lang).AUTH.PERMISSION_DENIED);
    }
    return _.omit(matchUser, ['password']);
}


/**
 * Update user information
 * @param {object} body Data to udpate
 * @param {string} token token of user
 * @param {string} lang Language of user
 */
async function updateUser(token, body, lang) {
    const user = await userModel.getUserByToken(token);
    if (!user) {
        throw Error(localeUtils.userMessage(lang).LOGIN.USER_DOES_NOT_EXIST);
    }
    // Update password
    if (body.new_password) {
        if (passwordManagement.hashPasswordMd5(body.password) !== user.password) {
            throw Error(localeUtils.userMessage(lang).LOGIN.PASSWORD_IS_NOT_VALID);
        }
        body.password = passwordManagement.hashPasswordMd5(body.new_password);
        delete body.new_password;
    }
    // Update email
    if (body.new_email) {
        const userMatch = await userModel.getUserByEmail(body.new_email);
        if (userMatch) {
            if (userMatch.id === body.id) {
                throw Error(localeUtils.userMessage(lang).UPDATE.CANNOT_CHANGE_THE_SAME_EMAIL);
            }
            throw Error(localeUtils.userMessage(lang).UPDATE.EMAIL_IS_ALREADY_EXIST);
        }
        body.email = body.new_email;
        delete body.new_email;
    }
    await userModel.update(user.id, body);
    return {
        message: localeUtils.userMessage(lang).UPDATE.UPDATE_USER_SUCCESSFULLY
    };
}


module.exports = {
    updateUser,
    getUserByToken,
    getListUser,
    getUserDetail,
    getUserById
}
