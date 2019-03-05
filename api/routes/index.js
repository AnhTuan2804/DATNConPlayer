const routes = require('express').Router();
const loginRouter = require('./user/login');
const registerRouter = require('./user/register');
const auth = require('../middlewares/auth.local');
const verifyMailRouter = require('./user/verify_email');
const userRouter = require('./user/user');
const firebaseData = require('./firebase_data');
const internalToken = require('../middlewares/internalToken.local');
const resendMail = require('./user/resend_email');
const forgotPassword = require('./user/forgot_password');
const logOutRouter = require('./user/logout');
class RouterIndex {

    constructor(app) {
        this.app = app;
    }
    
    registerRoutes() {
        this.app.use('/login', auth.verifyAuth, loginRouter);
        this.app.use('/register', auth.verifyAuth, registerRouter);
        this.app.use('/resend-mail', internalToken.verifyToken, resendMail);
        this.app.use('/forgot-password', forgotPassword);
        this.app.use('/verify-email', verifyMailRouter);
        this.app.use('/user', internalToken.verifyToken, userRouter);
        this.app.use('/logout', internalToken.verifyToken, logOutRouter);
    }
}

module.exports = (app) => { return new RouterIndex(app) };