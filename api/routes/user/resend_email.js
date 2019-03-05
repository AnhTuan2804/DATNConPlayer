const express = require('express');
const resendMail = require('../../core/user/resend_mail.handler');

const router = express.Router();
const resHelper = require('../../shared/helpers/resHelper')
const appConstant = require('../../shared/helpers/appConstant');

// Resend email verification
router.route('/').get(async (req, res) => {
    try {
        const lang = req.header(appConstant.LOCALE_HEADER);
        const response = await resendMail.resendMailUser(res.locals.token, lang);
        resHelper.sendResponse(res, response)
    } catch (error) {
        resHelper.sendError(res, error);
    }
});

module.exports = router
