const express = require('express');
const verifyEmail = require('../../core/user/verify_email.handler');
const resHelper = require('../../shared/helpers/resHelper');
const appConstant = require('../../shared/helpers/appConstant');

const router = express.Router();
// Verify user
router.route('/:userID').get(async (req, res) => {
    try {
        const lang = req.header(appConstant.LOCALE_HEADER);
        const response = await verifyEmail.verifyEmailUser(req.param('userID'), lang);
        resHelper.sendResponse(res, response)
    } catch (error) {
        resHelper.sendError(res, error);
    }
});
module.exports = router;
