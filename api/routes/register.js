'use strict';
const express = require('express');
const _ = require('lodash');
const router = express.Router();
const usersHandler = require('../core/user.handler')

class RegisterRouter {
    registerRoutes() {
        router.route('/')
            .post((req, res, next) => {
                // let authentication = Buffer.from(res.locals.tctAuth, 'base64');
                // let email = authentication.toString().split(':')[0];
                // let password = authentication.toString().split(':')[1];
                return usersHandler.createNewUser(req.body.email, req.body.password, req.body).then((user) => {
                    res.status(200).send(user)
                }).catch((error) => {
                    res.status(400).send({ code: 400, message: error.message });
                });
            });


        return router;
    }
}

const registerRouter = new RegisterRouter();
module.exports = registerRouter.registerRoutes();