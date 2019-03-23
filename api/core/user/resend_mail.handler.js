const moment = require('moment');
const emailHelper = require('../../shared/helpers/emailHelper')
const configCommon = require('../../shared/helpers/configCommon')
const encodeDecode = require('../../shared/helpers/encodeDecode');
const userModel = require('../../shareddb/models/user.model');
const localsUtil = require('../../shared/helpers/localesUtils');
const appConstant = require('../../shared/helpers/appConstant');

// Resend email verification
async function resendMailUser(token, lang) {
    const user = await userModel.getUserByToken(token);
    if (!user) {
        throw Error(localsUtil.userMessage(lang).LOGIN.USER_DOES_NOT_EXIST);
    } else {
        sendMail(user, lang)
        return {
            message: localsUtil.userMessage(lang).VERIFY.RESEND_EMAIL_IS_SUCCESSFULLY
        };
    }
}

// Send email verification again
async function sendMail(user, lang = appConstant.HEADER.LOCALE_ENGLISH) {
    if (user.status === 'Active') {
        throw Error(localsUtil.userMessage(lang).VERIFY.USER_IS_ALREADY_ACTIVE);
    } else {
        const data = {
            sent_mail_at: moment().unix()
        };
        userModel.update(user.id, data);
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
                                       font-weight: 600;" href=${configCommon.getHostWeb()}/verify-email/${encodeDecode.encode(user.id)}>${localsUtil.userMessage(appConstant.HEADER.LOCALE_ENGLISH).VERIFY.CONFIRM_YOUR_ACCOUNT}</a>
                               </div>
                   
                               <p style="    font-size: 1.2rem;
                               word-wrap: break-word;
                               color: #5a5a5a;
                               margin: 2rem 0; margin: 4rem 0 0;"></p>
                               <p style="font-size: 2rem;
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
        emailHelper.sendEmail(localsUtil.userMessage(appConstant.HEADER.LOCALE_ENGLISH).VERIFY.VERIFY_ACCOUNT, user.email, null, null, content)
        return {
            message: localsUtil.userMessage(lang).VERIFY.RESEND_EMAIL_IS_SUCCESSFULLY
        };
    }
}

module.exports = {
    resendMailUser
}
