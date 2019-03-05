const express = require('express');
const registerHandler = require('../../core/user/register.handler');
const resHelper = require('../../shared/helpers/resHelper')

const router = express.Router();

/**
 * @api {post} /register/ User register account
 * @apiGroup User
 * @apiParam {String} auth Encoded string 'email:password'
 * @apiBody {Object} Information of user
 * @apiSuccess {Object} user
 */
router.route('/').post(async (req, res) => {
    try {
        const response = await registerHandler.registerUser(req.body, res.locals.auth, res.locals.lang);
        resHelper.sendResponse(res, response)
    } catch (error) {
        resHelper.sendError(res, error);
    }
})

module.exports = router;
