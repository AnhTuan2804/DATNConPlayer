const userAuthentication = require('../shared/security/userAuthentication');
const db = require('../shared/db/db');

async function verifyToken(req, res, next) {
    try {
        const token = req.header('token');
        if (token) {
            res.locals.token = token;
            // userAuthentication.verifyToken(token);
            const user = await db.user.getUserByToken(token);
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
