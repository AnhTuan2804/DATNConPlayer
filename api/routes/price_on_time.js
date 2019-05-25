'use strict';
const express = require('express');
const _ = require('lodash');
const router = express.Router();
const timelHandler = require('../core/price_on_time.handler')

class PriceOntimeRouter {
    itemRouter() {
        router.route('/create')
            .post((req, res, next) => {
                return timelHandler.create(req.body).then((role) => {
                    res.status(200).send(role)
                }).catch((error) => {
                    res.status(400).send({ code: 400, message: error.message });
                });
            });
        router.route('/get-list')
            .get((req, res, next) => {
                return timelHandler.getList().then((listRole) => {
                    res.status(200).send(listRole)
                }).catch((error) => {
                    res.status(400).send({ code: 400, message: error.message });
                });
            });
        router.route('/update')
            .post((req, res, next) => {
                return timelHandler.update(req.body).then((role) => {
                    res.status(200).send(role)
                }).catch((error) => {
                    res.status(400).send({ code: 400, message: error.message });
                });
            });
        router.route('/delete')
            .post((req, res, next) => {
                return timelHandler.delete(req.body).then((role) => {
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
const itemRouter = new PriceOntimeRouter();
module.exports = itemRouter.itemRouter();