'use strict';
const bcrypt = require('bcrypt');
const aes256 = require('nodejs-aes256');
const md5 = require('js-md5');
const base64 = require('base-64');
const bytes = require('utf8-bytes')

class PasswordManagement {
    hashPassword(password) {
        return bcrypt.hashSync(password, 10)
    }

    comparePassword(password, encrypted) {
        return bcrypt.compare(password, encrypted, (err, res) => {
            return res
        });
    }

    getNonceString(length) {
        var text = "";
        var possible = "abcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    }

    hashPasswordBySaltAes256(plainPassword, salt) {
        return aes256.decrypt(salt, plainPassword);
    }

    hashPasswordMd5(password) {
        return (new Buffer(md5.array(bytes(password)))).toString('base64');
    }
}

module.exports = PasswordManagement;