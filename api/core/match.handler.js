'use strict';
const db = require('../shared/db/db');
const admin = require('firebase-admin');
const firebaseDB = admin.database();
const _ = require('lodash');
const timeUtil = require('../shared/timeUntil')
class MatchHandler {

    create(token, body) {
        return db.user.find({ where: { token: token } }).then((user) => {
            body.user = _.pick(user, ['email', 'id', 'fullname', 'phone', 'role_id']);
            body.date_of_match = timeUtil.getTimesUnixFromTimeFormat(body.date_of_match);
            return firebaseDB.ref('/match').push(body).then((result) => {
                return result;
            }).catch((err) => {
                throw err;
            })
        })
    }

    getList() {
        return new Promise((resolve) => {
            firebaseDB.ref('/match').on('value', (snapshot) => {
                const datas = snapshot.val();
                _.forEach(datas, (data, key) => {
                    data.id = key
                })
                resolve(datas);
            }, (errorObject) => {
                throw Error(errorObject);
            });
        })
    }

    getListForUser(token) {
        return db.user.find({ where: { token: token } }).then(user => {
            return new Promise((resolve) => {
                firebaseDB.ref('/match').on('value', (snapshot) => {
                    const datas = snapshot.val();
                    const tmp = [];
                    _.forEach(datas, (data, key) => {
                        data.id = key
                        if (data.user.email == user.email) {
                            tmp.push(data);
                        }
                    })
                    resolve(tmp);
                }, (errorObject) => {
                    throw Error(errorObject);
                });
            })
        })
    }

    getDetail(id, token) {
        return new Promise((resolve) => {
            firebaseDB.ref(`/match/${id}`).on('child_changed', (snapshot) => {
                const data = snapshot.val();
                data['id'] = id;
                resolve(data);
            }, (errorObject) => {
                throw Error(errorObject);
            });
        })
    }

    async update(body) {
        const id = body.id;
        if (!id) {
            return;
        }
        body = _.omit(body, ['id']);
        try {
            return firebaseDB.ref('/match/' + id).update(body);
        }
        catch (err) {
            throw err;
        }
    }

    delete(body) {
        return db.career.deleteCareer(body).then((result) => {
            return result;
        });
    }

}
module.exports = new MatchHandler();