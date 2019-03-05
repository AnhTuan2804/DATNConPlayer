const userModel = require('../../shared/models/user.model');
const localeUtils = require('../../shared/helpers/localesUtils');

async function logOut(token, lang) {
    const user = await userModel.getUserByToken(token);
    if (!user) {
        throw Error(localeUtils.userMessage(lang).LOGIN.USER_DOES_NOT_EXIST);
    }
    await userModel.removeUserToken(token);
    return {
        message: localeUtils.userMessage(lang).LOGOUT.LOG_OUT_SUCCESSFULLY
    };
}

module.exports = {
    logOut
}
