'use strict';
const express = require('express');
const _ = require('lodash');
const router = express.Router();
const teamHandler = require('../core/team.handler')

class TeamRouter {
    teamRoutes() {
        router.route('/create')
            .post((req, res, next) => {
                return teamHandler.create(req.body, res.locals.token).then((team) => {
                    res.status(200).send(team)
                }).catch((error) => {
                    res.status(400).send({ code: 400, message: error.message });
                });
            });
        router.route('/get-list-for-user')
            .get((req, res, next) => {
                return teamHandler.getListForUser(res.locals.token).then((result) => {
                    res.status(200).send(result)
                }).catch((error) => {
                    res.status(400).send({ code: 400, message: error.message });
                });
            });
        router.route('/get-list-for-admin')
            .get((req, res, next) => {
                return teamHandler.getListForAdmin(res.locals.token).then((result) => {
                    res.status(200).send(result)
                }).catch((error) => {
                    res.status(400).send({ code: 400, message: error.message });
                });
            });
        router.route('/update')
            .post((req, res, next) => {
                return teamHandler.update(req.body, res.locals.token).then((team) => {
                    res.status(200).send(team)
                }).catch((error) => {
                    res.status(400).send({ code: 400, message: error.message });
                });
            });
        router.route('/delete')
            .post((req, res, next) => {
                return teamHandler.delete(req.body, res.locals.token).then((team) => {
                    let data = {
                        message: 'Delete success'
                    }
                    res.status(200).send(data)
                }).catch((error) => {
                    res.status(400).send({ code: 400, message: error.message });
                });
            });
        router.route('/delete-member')
            .post((req, res, next) => {
                return teamHandler.deleteMember(req.body, res.locals.token).then((team) => {
                    let data = {
                        message: 'Delete success'
                    }
                    res.status(200).send(data)
                }).catch((error) => {
                    res.status(400).send({ code: 400, message: error.message });
                });
            });
        router.route('/detail')
            .get((req, res, next) => {
                return teamHandler.getDetail(req.query.id, res.locals.token).then((result) => {
                    res.status(200).send(result)
                }).catch((error) => {
                    res.status(400).send({ code: 400, message: error.message });
                });
            });
        router.route('/add-member')
            .post((req, res, next) => {
                return teamHandler.addMember(req.body, res.locals.token).then((result) => {
                    res.status(200).send(result)
                }).catch((error) => {
                    res.status(400).send({ code: 400, message: error.message });
                });
            });
        return router;
    }
}
const teamRoutes = new TeamRouter();
module.exports = teamRoutes.teamRoutes();