'use strict';
const express = require('express');
const _ = require('lodash');
const router = express.Router();
const levelHandler = require('../core/level.handler')

class AreaRouter {
    areaRoutes() {
        router.route('/create')
            .post((req, res, next) => {
                return levelHandler.create(req.body).then((role) => {
                    res.status(200).send(role)
                }).catch((error) => {
                    res.status(400).send({ code: 400, message: error.message });
                });
            });
        router.route('/get-list')
            .get((req, res, next) => {
                return levelHandler.getList().then((listRole) => {
                    res.status(200).send(listRole)
                }).catch((error) => {
                    res.status(400).send({ code: 400, message: error.message });
                });
            });
        router.route('/update')
            .post((req, res, next) => {
                return levelHandler.update(req.body).then((role) => {
                    res.status(200).send(role)
                }).catch((error) => {
                    res.status(400).send({ code: 400, message: error.message });
                });
            });
        router.route('/delete')
            .post((req, res, next) => {
                return levelHandler.delete(req.body).then((role) => {
                    let data = {
                        message: 'Delete success'
                    }
                    res.status(200).send(data)
                }).catch((error) => {
                    res.status(400).send({ code: 400, message: error.message });
                });
            });
        return router;
    }
}
const areaRoutes = new AreaRouter();
module.exports = areaRoutes.areaRoutes();