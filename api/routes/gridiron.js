'use strict';
const express = require('express');
const _ = require('lodash');
const router = express.Router();
const handler = require('../core/gridiron.handler')

class GridironRouter {
    itemRoutes() {
        router.route('/create')
            .post((req, res, next) => {
                return handler.create(req.body, res.locals.token).then((team) => {
                    res.status(200).send(team)
                }).catch((error) => {
                    res.status(400).send({ code: 400, message: error.message });
                });
            });
        router.route('/get-list-for-user')
            .get((req, res, next) => {
                return handler.getListForUser(res.locals.token).then((result) => {
                    res.status(200).send(result)
                }).catch((error) => {
                    res.status(400).send({ code: 400, message: error.message });
                });
            });
        router.route('/get-list-for-admin')
            .get((req, res, next) => {
                return handler.getListForAdmin(res.locals.token).then((result) => {
                    res.status(200).send(result)
                }).catch((error) => {
                    res.status(400).send({ code: 400, message: error.message });
                });
            });
        router.route('/detail')
            .get((req, res, next) => {
                return handler.getDetail(req.query.id, res.locals.token).then((result) => {
                    res.status(200).send(result)
                }).catch((error) => {
                    res.status(400).send({ code: 400, message: error.message });
                });
            });
        router.route('/update')
            .post((req, res, next) => {
                return handler.update(req.body, res.locals.token).then((team) => {
                    res.status(200).send(team)
                }).catch((error) => {
                    res.status(400).send({ code: 400, message: error.message });
                });
            });
        router.route('/delete')
            .post((req, res, next) => {
                return handler.delete(req.body).then((team) => {
                    let data = {
                        message: 'Delete success'
                    }
                    res.status(200).send(data)
                }).catch((error) => {
                    res.status(400).send({ code: 400, message: error.message });
                });
            });
        router.route('/delete-sub')
            .post((req, res, next) => {
                return handler.deleteSubGridiron(req.body).then((team) => {
                    let data = {
                        message: 'Delete success'
                    }
                    res.status(200).send(data)
                }).catch((error) => {
                    res.status(400).send({ code: 400, message: error.message });
                });
            });

        router.route('/create-sub-gridiron')
            .post((req, res, next) => {
                return handler.createSubGridiron(req.body, res.locals.token).then((result) => {
                    res.status(200).send(result)
                }).catch((error) => {
                    res.status(400).send({ code: 400, message: error.message });
                });
            });
        return router;
    }
}
const itemRoutes = new GridironRouter();
module.exports = itemRoutes.itemRoutes();