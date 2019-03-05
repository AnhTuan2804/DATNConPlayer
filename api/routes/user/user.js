const express = require('express');
const userHandler = require('../../core/user/user.handler');
const resHelper = require('../../shared/helpers/resHelper');

const router = express.Router();


router.route('/').get(async (req, res) => {
    try {
        const idUser = req.query.id;
        let response = '';
        // If request have query param {id} -> get detail of that bank account
        if (idUser) {
            response = await userHandler.getUserDetail(res.locals.token, idUser, res.locals.lang);
            resHelper.sendResponse(res, response);
        } else {
            response = await userHandler.getListUser(res.locals.token, res.locals.lang);
            resHelper.sendResponse(res, response);
        }
    } catch (error) {
        resHelper.sendError(res, error);
    }
});

// Get user information
router.route('/profile').get(async (req, res) => {
    try {
        const response = await userHandler.getUserByToken(res.locals.token, res.locals.lang);
        resHelper.sendResponse(res, response)
    } catch (error) {
        resHelper.sendError(res, error);
    }
});

// Get user information
router.route('/user-public').get(async (req, res) => {
    try {
        const response = await userHandler.getUserById(req.query.id, res.locals.lang);
        resHelper.sendResponse(res, response)
    } catch (error) {
        resHelper.sendError(res, error);
    }
});


/**
 *
 * @api {post} //user/update User update information
 * @apiName updateUser
 * @apiGroup User
 *
 *
 * @apiParam  {Object} body {Username, logo, email, password, url, location, birthday, sex, description}
 *
 * @apiSuccess (200) {Object} updatedUser
 *
 *
 */
router.route('/update').post(async (req, res) => {
    try {
        const response = await userHandler.updateUser(res.locals.token, req.body, res.locals.lang);
        resHelper.sendResponse(res, response)
    } catch (error) {
        resHelper.sendError(res, error);
    }
});

// Admin Get list user
router.route('/admin').get(async (req, res) => {
    try {
        const response = await userHandler.getListUser(res.locals.token, res.locals.lang);
        resHelper.sendResponse(res, response)
    } catch (error) {
        resHelper.sendError(res, error);
    }
})

module.exports = router;
