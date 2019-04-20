var express = require('express');
const userHandler = require('../core/user.handler');
var router = express.Router();
const _ = require('lodash');
class ResetPassword {
    registerRoutes() {
        router.route('/').post((req, res) => {
            return userHandler.resetPassword(req.body.email).then((result) => {
                res.status(200).send({ message: 'Reset password successfully, Please check your email!' })
            }).catch((error) => {
                res.status(400).send({ code: 400, message: error.message });
            });
        })
        return router;
    }
}
const resetPasswordRouter = new ResetPassword();
module.exports = resetPasswordRouter.registerRoutes();