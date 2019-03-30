var express = require('express');
const loginHandler = require('../core/login.handler');
var router = express.Router();
const _ = require('lodash');
class Login {
    registerRoutes() {
        router.route('/').post((req, res) => {
            const auth = Buffer.from(res.locals.auth, 'base64');
            const email = auth.toString().split(':')[0];
            const password = auth.toString().split(':')[1];
            return loginHandler.doEmailLogin(email, password).then((user) => {
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