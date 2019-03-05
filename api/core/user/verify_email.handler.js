

const moment = require('moment');
const encodeDecode = require('../../shared/helpers/encodeDecode');
const userModel = require('../../shared/models/user.model');
const userAuthen = require('../../shared/security/userAuthentication');
const localsUtil = require('../../shared/helpers/localesUtils');
const validatorUtils = require('../../shared/helpers/validatorUtils');

// Verify user
async function verifyEmailUser(idUser, lang) {
    const decodedIdUser = encodeDecode.decode(idUser);
    if (validatorUtils.firebaseValidator(decodedIdUser) || validatorUtils.asciiCharacterValidator(decodedIdUser)) {
        throw Error(localsUtil.userMessage(lang).VERIFY.VERIFY_ACCOUNT_LINK_DOES_NOT_EXIST)
    }
    const user = await userModel.getUserById(decodedIdUser);
    if (user) {
        if (user.status === 2) {
            throw Error(localsUtil.userMessage(lang).USER_IS_ALREADY_ACTIVE);
        } else {
            // Check mail expired, die after 30m
            if (userAuthen.verifyEmailActive(user.sent_mail_at)) {
                const dataUpdate = {
                    status: 2,
                    activated_at: moment().unix()
                }
                await userModel.update(decodedIdUser, dataUpdate);
                return {
                    message: localsUtil.userMessage(lang).VERIFY.VERIFY_EMAIL_IS_SUCCESSFULLY
                }
            }
                throw Error(localsUtil.userMessage(lang).VERIFY.THIS_EMAIL_VERIFICATION_TIME_HAS_EXPIRED);
        }
    } else {
        throw Error(localsUtil.userMessage(lang).LOGIN.USER_DOES_NOT_EXIST);
    }
}


module.exports = {
    verifyEmailUser
}
