const express = require('express');

const router = express.Router();
const resHelper = require('../../shared/helpers/resHelper');
const localesUtils = require('../../shared/helpers/localesUtils');
const loginHandler = require('../../core/user/login.handler');

/**
 * @api {post} /login/ User login
 * @apiGroup User
 * @apiParam {String} auth Encoded string include username and password of User
 * @apiBody {type} // email: 0, facebook: 1, twitter: 2, line: 3;
 * @apiSuccess {String} created_at Firstname of the User.
 */
router.route('/').post(async (req, res) => {
    try {
        const response = await loginHandler.loginUserByEmail(res.locals.auth, res.locals.lang, req.body);
        // if (response.role !== 1) {
        resHelper.sendResponse(res, response)
        // } else {
        //     resHelper.sendError(res, {
        //         message: localesUtils.userMessage(res.locals.lang).LOGIN.USER_DOES_NOT_EXIST
        //     })
        // }
    } catch (error) {
        resHelper.sendError(res, error);
    }
});

/**
 * @api {post} /login/social-network User login by social network
 * @apiGroup User
 * @apiParam {String} accessToken returned from social network
 * @apiBody {type} // email: 0, facebook: 1, twitter: 2, line: 3;
 * @apiSuccess {String} created_at Firstname of the User.
 */

router.route('/social-network').post(async (req, res) => {
    try {
        const response = await loginHandler.loginUserBySocialNetwork(res.locals.accessToken, res.locals.lang, req.body);
        if (response.role !== 1) {
            resHelper.sendResponse(res, response)
        } else {
            resHelper.sendError(res, {
                message: localesUtils.userMessage(res.locals.lang).LOGIN.USER_DOES_NOT_EXIST
            })
        }
    } catch (error) {
        resHelper.sendError(res, error);
    }
});

// //Admin login
// router.route('/admin').post(async(req, res) => {
//         try {
//             let lang = req.header(appConstant.LOCALE_HEADER);
//             let response = await loginHandler.doEmailLogin(res.locals.auth, lang);
//             if (response.role == 1) {
//                 resHelper.sendResponse(res, response)
//             } else {
//                 resHelper.sendError(res, { message: localsUtil.userMessage(lang).USER_DOES_NOT_EXIST })
//             }
//         } catch (error) {
//             resHelper.sendError(res, error);
//         }
// });

module.exports = router;
