const admin = require('firebase-admin');

const db = admin.database();
const moment = require('moment');
const _ = require('lodash');

class FirebaseCommon {
    create(data, url) {
        return new Promise((resolve) => {
            data = _.omitBy(data, (value, key) => {
                return _.isUndefined(value)
            });
            const ref = db.ref(url);
            if (data) {
                data.created_at = data.created_at ? data.created_at : moment().unix()
            }
            const r = ref.push(data, (snapshot) => {
                if (snapshot) {
                    throw Error(snapshot.val());
                } else {
                    resolve(r.key);
                }
            });
        })
    }

    update(data, url, isUpdateDate) {
        return new Promise((resolve) => {
            data = _.omitBy(data, (value, key) => {
                return _.isUndefined(value)
            });
            if (!isUpdateDate) {
                data.updated_at = moment().unix()
            }
            const ref = db.ref(url);
            const r = ref.update(data, (snapshot) => {
                if (snapshot) {
                    throw Error(snapshot.val());
                } else {
                    resolve(r.key);
                }
            });
        })
    }

    remove(url) {
        return new Promise((resolve) => {
            db.ref(url).remove((error) => {
                if (!error) {
                    resolve('success');
                } else {
                    throw Error(error);
                }
            })
        })
    }

    read(url) {
        return new Promise((resolve) => {
            const ref = db.ref(url);
            ref.once('value', (snapshot) => {
                resolve(snapshot.val());
            }, (errorObject) => {
                throw Error(errorObject);
            });
        })
    }

    equalTo(url, path, param) {
        return new Promise((resolve) => {
            const ref = db.ref(url);
            ref.orderByChild(path).equalTo(param).once('value', (snapshot) => {
                resolve(snapshot.val());
            }, (errorObject) => {
                throw Error(errorObject);
            })
        })
    }

    equalToValue(url, path, param) {
        return new Promise((resolve) => {
            const ref = db.ref(url);
            ref.orderByChild(path).equalTo(param).once('value', snapshot => {
                const value = []
                snapshot.forEach(child => {
                    value.push(child.val())
                });
                resolve(value)
            }, (errorObject) => {
                throw Error(errorObject);
            })
        })
    }

    hasChild(url, path) {
        return new Promise((resolve) => {
            const ref = db.ref(url);
            ref.once('value', (snapshot) => {
                const value = {}
                snapshot.forEach(child => {
                    if (child.hasChild(path)) { value[child.key] = child.val() }
                });
                resolve(value)
            }, (errorObject) => {
                throw Error(errorObject);
            });
        })
    }
}

module.exports = new FirebaseCommon();
