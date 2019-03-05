const md5 = require('js-md5');
const bytes = require('utf8-bytes')

function getNonceString(length, number) {
    let text = '';
    let possible;
    if (number) {
        possible = '0123456789'
    } else {
        possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
    }
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function hashPasswordMd5(password) {
    password += '';
    return Buffer.from(md5.array(bytes(password))).toString('base64');
}

module.exports = {
    getNonceString,
    hashPasswordMd5
}
