'use strict';
const db = require('../shared/db/db');
const admin = require('firebase-admin');
const firebaseDB = admin.database();
const _ = require('lodash');
const timeUtil = require('../shared/timeUntil')
class NotifyHandler {

    create(token, body) {
        body.create_at = timeUtil.getTimesUnixFromTimeFormat(body.create_at);
        return firebaseDB.ref('/notify').push(body).then((result) => {
            return result;
        }).catch((err) => {
            throw err;
        })
    }

    async update(body) {
        const id = body.id;
        if (!id) {
            return;
        }
        body = _.omit(body, ['id']);
        body.create_at = timeUtil.getTimesUnixFromTimeFormat(body.create_at);
        try {
            return firebaseDB.ref('/notify/' + id).update(body);
        }
        catch (err) {
            throw err;
        }
    }
}
module.exports = new NotifyHandler();