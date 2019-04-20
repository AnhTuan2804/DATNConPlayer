'use strict';
const db = require('../shared/db/db');
class SizeGridironHandler {

    create(body) {
        return db.size_gridiron.createSizeGridiron(body).then((result) => {
            return result;
        });
    }

    getList() {
        return db.size_gridiron.getListSizeGridiron().then((result) => {
            return result;
        })
    }

}
module.exports = new SizeGridironHandler();