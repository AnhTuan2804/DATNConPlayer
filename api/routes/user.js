'use strict';
const express = require('express');
const _ = require('lodash');
const router = express.Router();
const usersHandler = require('../core/user.handler')

class UserRouter {
    userRoutes() {
        router.route('/list-user')
            .get((req, res, next) => {
                return usersHandler.getListUser().then((listUser) => {
                    res.status(200).send(listUser)
                }).catch((error) => {
                    res.status(400).send({ code: 400, message: error.message });
                });
            });
        router.route('/profile')
            .get((req, res, next) => {
                return usersHandler.findUserByToken(res.locals.tctToken).then((user) => {
                    res.status(200).send(user)
                }).catch((error) => {
                    res.status(400).send({ code: 400, message: error.message });
                });
            });
        router.route('/edit-profile')
            .post((req, res, next) => {
                return usersHandler.editProfile(res.locals.tctToken, req.body).then((user) => {
                    res.status(200).send(user)
                }).catch((error) => {
                    res.status(400).send({ code: 400, message: error.message });
                });
            });

        router.route('/change-password')
            .post((req, res, next) => {
                if (req.body['old-password'] == req.body['new-password']) {
                    return res.status(400).send({ code: 400, message: 'Password is not safe' });
                }
                return usersHandler.editPassWord(res.locals.tctToken, req.body['old-password'], req.body['new-password']).then((user) => {
                    res.status(200).send(user)
                }).catch((error) => {
                    res.status(400).send({ code: 400, message: error.message });
                });
            });

        router.route('/change-password-user')
            .post((req, res, next) => {
                return usersHandler.editPassWordUser(req.body['id'], req.body['new-password']).then((user) => {
                    res.status(200).send(user)
                }).catch((error) => {
                    res.status(400).send({ code: 400, message: error.message });
                });
            });

        router.route('/logout')
            .post((req, res, next) => {
                return usersHandler.logOut(res.locals.tctToken).then((user) => {
                    res.status(200).send({ message: 'logout success' })
                }).catch((error) => {
                    res.status(400).send({ code: 400, message: 'bad request ' + error.message });
                });
            });
        router.route('/delete-user')
            .post((req, res, next) => {
                return usersHandler.doDeleteUser(req.body.id).then((user) => {
                    let data = {
                        message: 'delete user success'
                    }
                    res.status(200).send(data)
                }).catch((error) => {
                    res.status(400).send({ code: 400, message: error.message });
                });
            });

        router.route('/edit-user')
            .post((req, res, next) => {
                return usersHandler.editUser(req.body).then((user) => {
                    res.status(200).send(user)
                }).catch((error) => {
                    res.status(400).send({ code: 400, message: error.message });
                });
            });
        return router;
    }
}

const userRouter = new UserRouter();
module.exports = userRouter.userRoutes();