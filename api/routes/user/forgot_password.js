const express = require('express');
const forgotPasswordHandler = require('../../core/user/forgot_password.handler');
const resHelper = require('../../shared/helpers/resHelper')
const appConstant = require('../../shared/helpers/appConstant');

const router = express.Router();

/**
 *
 * @api {get} /forgot-password/code Send code to email that forgotPasswordHandler
 * @apiName sendCode
 * @apiGroup Forgot password
 *
 * @apiParam  {string} email email from query string
 *
 * @apiSuccess (200) {string} message message sent code successfull
 *
 * @apiParamExample  {type} Request-Example:
 * {
 *     email : string
 * }
 *
 *
 * @apiSuccessExample {type} Success-Response:
 * {
 *     message : Please check your email to get the code
 * }
 *
 *
 */
router.route('/code').get(async (req, res) => {
    try {
        const email = req.query.email || null;
        const lang = req.header(appConstant.LOCALE_HEADER);
        const response = await forgotPasswordHandler.sendCode(email, lang);
        resHelper.sendResponse(res, response);
    } catch (error) {
        resHelper.sendError(res, error);
    }
});

/**
 *
 * @api {post} /forgot-password/change-password Use code to change new password
 * @apiName changePassword
 * @apiGroup Forgot password
 *
 * @apiParam  {String} paramName description
 *
 * @apiSuccess (200) {type} name description
 *
 * @apiParamExample  {type} Request-Example:
 * {
 *     email : 'rovn@lapurema.net',
 *     code: 23232,
 *     password: '4QrcOUm6Wau+VuBX8g+IPg=='
 * }
 *
 *
 * @apiSuccessExample {type} Success-Response:
 * {
 *     message : reset password successfully
 * }
 *
 *
 */
router.route('/change-password').post(async (req, res) => {
    try {
        const lang = req.header(appConstant.LOCALE_HEADER);
        const result = await forgotPasswordHandler.changePassword(req.body, lang);
        resHelper.sendResponse(res, result);
    } catch (error) {
        resHelper.sendError(res, error);
    }
});

module.exports = router;
