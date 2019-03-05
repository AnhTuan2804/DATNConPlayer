const express = require('express');

const router = express.Router();
const resHelper = require('../../shared/helpers/resHelper')
const loutOutHandler = require('../../core/user/logout.handler');


router.route('/').get(async (req, res) => {
    try {
        const response = await loutOutHandler.logOut(res.locals.token, res.locals.lang);
        resHelper.sendResponse(res, response)
    } catch (error) {
        resHelper.sendError(res, error);
    }
});

module.exports = router;
