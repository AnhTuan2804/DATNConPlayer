class Auth {
    verifyAuth(req, res, next) {
        let auth = req.header('auth');
        try {
            if (!auth) {
                throw new Error('authentication token not found');
            } else {
                res.locals.auth = auth;
                next();
            }
        } catch (err) {
            console.log(err);
            next(105);
        }
    }
}
module.exports = new Auth();