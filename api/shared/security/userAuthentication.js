'use strict';
const jwt = require('jsonwebtoken');
const config = require('../../config/db.config');
const moment = require('moment');
const PasswordManagement = require('./passwordManagement');
const appConstant = require('../../shared/appConstant');

class UserAuthentication {
    authenticate(email, password, db) {
        return db.find({ where: { email: email } })
            .then((user) => {
                if (!user) {
                    throw new Error('User name or password is not valid!')
                }
                if (user.is_lock == appConstant.USER_STATUS_BLOCK) {
                    throw new Error('Account blocked');
                }
                if (new PasswordManagement().comparePassword(password, user.password)) {
                    return user
                } else {
                    throw new Error('Password is not valid!');
                }
            });
    }
    generateToken(user) {
        let now = moment().unix();
        if (user.token) {
            user.token = null;
        }
        let payload = {
            "iat": now,
            "exp": now + appConstant.TIME_EXP_TOKEN,
            "uid": user.id,
            "claims": {
                user
            }
        };
        return jwt.sign(payload, config.jwt.key);
    }
    verifyToken(token) {
        let decodedToken = jwt.decode(token);
        if (decodedToken.exp < moment().unix()) {
            throw new Error('token expired');
        }
        return decodedToken;
    }
}
module.exports = new UserAuthentication();