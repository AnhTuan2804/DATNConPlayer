'use strict';
const express = require('express');
const _ = require('lodash');
const router = express.Router();
const usersHandler = require('../core/user.handler')

class RegisterRouter {
    registerRoutes() {
        router.route('/')
            .post((req, res, next) => {
                let auth = Buffer.from(res.locals.auth, 'base64');
                const data = {
                    email : auth.toString().split(':')[0],
                    password : auth.toString().split(':')[1],
                    phone : auth.toString().split(':')[2],
                    fullname : auth.toString().split(':')[3]
                }
                return usersHandler.createNewUser(data).then((user) => {
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