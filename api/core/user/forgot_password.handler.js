const moment = require('moment');
const emailHelper = require('../../shared/helpers/emailHelper')
const passwordManagement = require('../../shared/security/passwordManagement')
const userModel = require('../../shared/models/user.model');
const encodeDecode = require('../../shared/helpers/encodeDecode');
const userAuthen = require('../../shared/security/userAuthentication');
const localsUtil = require('../../shared/helpers/localesUtils');
const configCommon = require('../../shared/helpers/configCommon');
const appConstant = require('../../shared/helpers/appConstant');

// Send code to recover password
async function sendCode(email, lang = appConstant.HEADER.LOCALE_ENGLISH) {
    const user = await userModel.getUserByEmail(email);
    if (!user) {
        throw Error(localsUtil.userMessage(lang).LOGIN.USER_DOES_NOT_EXIST);
    } else {
        const newCode = {
            code_reset_pass: passwordManagement.getNonceString(6, true),
            code_created_at: moment().unix()
        }
        await userModel.update(user.id, newCode);
        const codeEncoded = encodeDecode.encode(`${email}:${newCode.code_reset_pass}`);
        const content = `<section style="text-align: center;margin: auto;
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
                                       font-weight: 600;" href=${configCommon.getHostWeb()}/change-password/${codeEncoded}>${localsUtil.userMessage(appConstant.HEADER.LOCALE_ENGLISH).RESET_PASSWORD.RESET_PASSWORD}</a>
                               </div>
                               
                               <p style="    font-size: 1.2rem;
                               word-wrap: break-word;
                               color: #5a5a5a;
                               margin: 2rem 0; margin: 4rem 0 0;"></p>
                               <p style="font-size: 2rem;
                               font-weight: 600;"></p>
                               <p style="font-size: 1.7rem; word-wrap: break-word;"></p>
                               <p style="font-size: 1.7rem;">
                               ${localsUtil.userMessage(appConstant.HEADER.LOCALE_ENGLISH).RESET_PASSWORD.CLICK_BUTTON_TO_RESET_PASSWORD}
                               </p>
                               <div class="footer">
                                       <p style=" text-align: right;
                                       font-size: 2rem;
                                       padding-right: 1rem;    line-height: 1px;">${localsUtil.userMessage(appConstant.HEADER.LOCALE_ENGLISH).VERIFY.BEST_REGARDS}</p>
                                       <p style="text-align: right;
                                       font-size: 2rem;
                                       padding-right: 1rem;    line-height: 1px;">${localsUtil.userMessage(appConstant.HEADER.LOCALE_ENGLISH).VERIFY.DREAMUS_TEAM}</p>
                                   </div>
                           </div>
                          
                       </section>`;
        emailHelper.sendEmail(localsUtil.userMessage(appConstant.HEADER.LOCALE_ENGLISH).RESET_PASSWORD.RESET_PASSWORD, user.email, null, null, content);
        return {
            message: localsUtil.userMessage(lang).RESET_PASSWORD.PLEASE_CHECK_YOUR_EMAIL_LET_GET_CODE
        };
    }
}

// Use code to change new password
async function changePassword(body, lang) {
    const email = body.email;
    const codePasswordChange = body.code;
    const user = await userModel.getUserByEmail(email);
    if (!user) {
        throw Error(localsUtil.userMessage(lang).LOGIN.USER_DOES_NOT_EXIST);
    }
    if (Number(user.code_reset_pass) === Number(codePasswordChange)) {
        if (userAuthen.verifyCodeResetPassword(user.code_created_at)) {
            const data = {};
            data.password = passwordManagement.hashPasswordMd5(encodeDecode.decode(body.password))
            data.code_reset_pass = null;
            await userModel.update(user.id, data);
            return {
                message: localsUtil.userMessage(lang).RESET_PASSWORD.RESET_PASSWORD_IS_SUCCESSFULLY
            }
        }
        throw Error(localsUtil.userMessage(lang).RESET_PASSWORD.LINK_RESET_PASSWORD_HAS_BEEN_EXPIRED);
    } else {
        throw Error(localsUtil.userMessage(lang).RESET_PASSWORD.LINK_RESET_PASSWORD_HAS_BEEN_EXPIRED);
    }
}


module.exports = {
    sendCode,
    changePassword
}
