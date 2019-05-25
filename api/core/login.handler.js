'use strict';
const db = require('../shared/db/db');
const userAuth = require('../shared/security/userAuthentication');
const _ = require('lodash');
const appConstant = require('../shared/appConstant');

class LoginHandler {
    doEmailLogin(email, password) {
        return userAuth.authenticate(email, password, db.user)
            .then((user) => {
                return db.user.updateToken(user.id, userAuth.generateToken(user))
                    .then((userInfo) => {
                        if (user.is_lock == appConstant.USER_STATUS_BLOCK) {
                            throw new Error("Account was blocked!");
                        }
                        userInfo['role'] = user.role
                        return userInfo
                    });
            });
    }

}

module.exports = new LoginHandler();