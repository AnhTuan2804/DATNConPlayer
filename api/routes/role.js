'use strict';
const express = require('express');
const _ = require('lodash');
const router = express.Router();
const roleHandler = require('../core/role.handler')

class RoleRouter {
    roleRoutes() {
        router.route('/create')
            .post((req, res, next) => {
                return roleHandler.createRoles(req.body).then((role) => {
                    res.status(200).send(role)
                }).catch((error) => {
                    res.status(400).send({ code: 400, message: error.message });
                });
            });
        router.route('/get-list')
            .get((req, res, next) => {
                return roleHandler.getListRoles().then((listRole) => {
                    res.status(200).send(listRole)
                }).catch((error) => {
                    res.status(400).send({ code: 400, message: error.message });
                });
            });
        router.route('/update')
            .post((req, res, next) => {
                return roleHandler.updateRole(req.body).then((role) => {
                    res.status(200).send(role)
                }).catch((error) => {
                    res.status(400).send({ code: 400, message: error.message });
                });
            });
        router.route('/delete')
            .post((req, res, next) => {
                return roleHandler.deleteRoles(req.body).then((role) => {
                    let data = {
                        message: 'Delete role success'
                    }
                    res.status(200).send(data)
                }).catch((error) => {
                    res.status(400).send({ code: 400, message: error.message });
                });
            });
        return router;
    }
}
const roleRouter = new RoleRouter();
module.exports = roleRouter.roleRoutes();