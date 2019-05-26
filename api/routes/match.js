'use strict';
const express = require('express');
const _ = require('lodash');
const router = express.Router();
const matchHandler = require('../core/match.handler')

class MatchRouter {
    itemRouter() {
        router.route('/create')
            .post((req, res, next) => {
                return matchHandler.create(res.locals.token, req.body).then((result) => {
                    res.status(200).send({message: 'Create data successfully'})
                }).catch((error) => {
                    res.status(400).send({ code: 400, message: error.message });
                });
            });
        router.route('/get-list')
            .get(async (req, res, next) => {
                const data = await matchHandler.getList();
                res.status(200).send(data);
            });
        router.route('/get-list-for-user')
            .get(async (req, res, next) => {
                const data = await matchHandler.getListForUser(res.locals.token);
                res.status(200).send(data);
            });
        router.route('/detail')
            .get(async (req, res, next) => {
                const data = await matchHandler.getDetail(req.query.id, res.locals.token)
                res.status(200).send(data);
            });
        router.route('/update')
            .post((req, res, next) => {
                return matchHandler.update(req.body, null).then((result) => {
                    res.status(200).send({ code: 200, message: 'Update Successfully' });
                }).catch((error) => {
                    res.status(400).send({ code: 400, message: error.message });
                });
            });
        return router;
    }
}
const itemRouter = new MatchRouter();
module.exports = itemRouter.itemRouter();