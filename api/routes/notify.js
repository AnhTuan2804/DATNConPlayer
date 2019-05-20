'use strict';
const express = require('express');
const _ = require('lodash');
const router = express.Router();
const notifyHandler = require('../core/notify.handler')

class MatchRouter {
    itemRouter() {
        router.route('/create')
            .post((req, res, next) => {
                return notifyHandler.create(res.locals.token, req.body).then((result) => {
                    res.status(200).send({message: 'Create data successfully'})
                }).catch((error) => {
                    res.status(400).send({ code: 400, message: error.message });
                });
            });
        router.route('/update')
            .post((req, res, next) => {
                return notifyHandler.update(req.body, null).then((result) => {
                    res.status(200).send({ err: 'Update Successfully' });
                }).catch((error) => {
                    res.status(400).send({ code: 400, message: error.message });
                });
            });
        return router;
    }
}
const itemRouter = new MatchRouter();
module.exports = itemRouter.itemRouter();