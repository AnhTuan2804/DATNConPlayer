'use strict';
const express = require('express');
const _ = require('lodash');
const router = express.Router();
const gridironHandler = require('../core/gridiron.handler')

class AreaRouter {
    areaRoutes() {
        router.route('/get-list-gridiron')
            .get((req, res, next) => {
                return gridironHandler.getListForAdmin(null).then((listRole) => {
                    res.status(200).send(listRole)
                }).catch((error) => {
                    res.status(400).send({ code: 400, message: error.message });
                });
            });

        router.route('/gridiron-detail')
            .get((req, res, next) => {
                return gridironHandler.getDetail(req.query.id, null).then((result) => {
                    res.status(200).send(result)
                }).catch((error) => {
                    res.status(400).send({ code: 400, message: error.message });
                });
            });

        return router;
    }
}
const areaRoutes = new AreaRouter();
module.exports = areaRoutes.areaRoutes();