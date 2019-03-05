const userAuthentication = require('../shared/security/userAuthentication');
const appConstant = require('../shared/helpers/appConstant');
const userModel = require('../shared/models/user.model');

async function verifyToken(req, res, next) {
    try {
        const token = req.header('token');
        let lang = req.header(appConstant.HEADER.LOCALE_HEADER);
        if (!lang) {
            lang = appConstant.HEADER.LOCALE_DEFAULT;
        }
        if (token) {
            res.locals.token = token;
            res.locals.lang = lang;
            userAuthentication.verifyToken(token);
            const user = await userModel.getUserByToken(token);
            if (user) {
                next();
            } else {
                next(102);
            }
        } else {
            next(102)
        }
    } catch (err) {
        next(102)
    }
}

module.exports = {
    verifyToken
}
