var express = require('express');
const loginHandler = require('../core/login.handler');
var router = express.Router();
const _ = require('lodash');
class Login {
    registerRoutes() {
        router.route('/').post((req, res) => {
            // const authentication = Buffer.from(res.locals.auth, 'base64');
            // const email = authentication.toString().split(':')[0];
            // const password = authentication.toString().split(':')[1];
            return loginHandler.doEmailLogin(req.body.email, req.body.password).then((user) => {
                res.status(200).send(user);
            }).catch((error) => {
                res.status(400).send({ code: 400, message: error.message });
            })
        });
        return router;
    }

}
const loginRouter = new Login();
module.exports = loginRouter.registerRoutes();