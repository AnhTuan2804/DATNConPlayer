const userAuthentication = require('../shared/security/userAuthentication');
const db = require('../shared/db/db');

async function verifyAdmin(req, res, next) {
    try {
        const token = req.header('token');
        if (token) {
            res.locals.token = token;
            const user = await db.user.getUserByToken(token);
            if (user) {
                if(user.role.role == 'Admin'){
                    next();
                } else {
                    next(110);
                }
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
    verifyAdmin
}
