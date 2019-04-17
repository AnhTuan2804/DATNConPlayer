'use strict';
const express = require('express');
const _ = require('lodash');
const router = express.Router();
const itemHandler = require('../core/size_gridiron.handler');

class SizeGridironRouter {
    itemRoutes() {
        router.route('/create')
            .post((req, res, next) => {
                return itemHandler.create(req.body).then((result) => {
                    res.status(200).send(result)
                }).catch((error) => {
                    res.status(400).send({ code: 400, message: error.message });
                });
            });
        router.route('/get-list')
            .get((req, res, next) => {
                return itemHandler.getList().then((result) => {
                    res.status(200).send(result)
                }).catch((error) => {
                    res.status(400).send({ code: 400, message: error.message });
                });
            });
        return router;
    }
}
const itemRoutes = new SizeGridironRouter();
module.exports = itemRoutes.itemRoutes();