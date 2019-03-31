const routes = require('express').Router();
const loginRouter = require('./login');
const userRouter = require('./user');
const roleRouter = require('./role');
const resetPasswordRouter = require('./resetPassword');
const internalToken = require('../middlewares/internalToken.local');
const auth = require('../middlewares/auth.local');
const registerRouter = require('./register');
const monitorRouter = require('./monitor');

const ROOT_ROUTE = '/api';

class RouterIndex {
    constructor(app) {
        this.app = app;
    }
    registerRoutes() {
        //Monitoring endpoint
        this.app.use(ROOT_ROUTE + '/_ah', monitorRouter);

        this.app.use(ROOT_ROUTE + '/register', auth.verifyAuth, registerRouter);
        this.app.use(ROOT_ROUTE + '/login', auth.verifyAuth, loginRouter);
        this.app.use(ROOT_ROUTE + '/user', internalToken.verifyToken, userRouter);
        this.app.use(ROOT_ROUTE + '/role', internalToken.verifyToken, roleRouter);
        this.app.use(ROOT_ROUTE + '/reset-password', resetPasswordRouter);
    }
}

module.exports = (app) => { return new RouterIndex(app) };