'use strict';
const db = require('../shared/db/db');
class GridironHandler {

    create(body, token) {
        return db.gridiron.createGridiron(body, token).then((result) => {
            return result;
        });
    }

    createSubGridiron(body, token) {
        return db.sub_gridiron.createSubGridiron(body).then((result) => {
            return result;
        });
    }

    getListForUser(token) {
        return db.gridiron.getListForUser(token).then((result) => {
            return result;
        })
    }

    getDetail(id, token) {
        return db.gridiron.getDetail(id, token).then((result) => {
            return result;
        })
    }

    getListForAdmin(token) {
        return db.gridiron.getListForAdmin(token).then((result) => {
            return result;
        })
    }

    update(body, token) {
        return db.gridiron.updateGridiron(body, token).then((result) => {
            return result;
        });
    }

    delete(body) {
        return db.gridiron.deleteGridiron(body).then((result) => {
            return result;
        });
    }

    deleteSubGridiron(body) {
        return db.sub_gridiron.deleteSubGridiron(body).then((result) => {
            return result;
        });
    }
}
module.exports = new GridironHandler();