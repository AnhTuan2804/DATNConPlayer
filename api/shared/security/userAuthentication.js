'use strict';
const jwt = require('jsonwebtoken');
const config = require('../../config/db.config');
const moment = require('moment');
const db = require('../db/db');
const appConstant = require('../../shared/appConstant');
const bcrypt = require('bcrypt')
class UserAuthentication {
    async authenticate(email, password, dbUser) {
        return dbUser.find({ where: { email: email }, include: [{ model: db.role }] })
            .then(async (user) => {
                if (!user) {
                    throw new Error('Sai email hoặc mật khẩu!')
                }
                if (user.is_lock == appConstant.USER_STATUS_BLOCK) {
                    throw new Error('Tài khoản đang bị khóa!');
                }
                const checkPass = await bcrypt.compare(password, user.password);
                if (checkPass) {
                    return user
                } else {
                    throw new Error('Sai mật khẩu!');
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