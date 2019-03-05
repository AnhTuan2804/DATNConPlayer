const express = require('express');
const userHandler = require('../../core/user/user.handler');
const resHelper = require('../../shared/helpers/resHelper');

const router = express.Router();

// Get user information
router.route('/').get(async (req, res) => {
    try {
        const response = await userHandler.getUserById(req.query.id, res.locals.lang);
        resHelper.sendResponse(res, response)
    } catch (error) {
        resHelper.sendError(res, error);
    }
});


module.exports = router;
