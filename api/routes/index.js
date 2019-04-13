const routes = require('express').Router();
const loginRouter = require('./login');
const userRouter = require('./user');
const roleRouter = require('./role');
const areaRouter = require('./area');
const teamRouter = require('./team');
const levelRouter = require('./level');
const resetPasswordRouter = require('./resetPassword');
const internalToken = require('../middlewares/internalToken.local');
const authAdmin = require('../middlewares/auth-admin.local');
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
        //user
        this.app.use(ROOT_ROUTE + '/register', auth.verifyAuth, registerRouter);
        this.app.use(ROOT_ROUTE + '/login', auth.verifyAuth, loginRouter);
        this.app.use(ROOT_ROUTE + '/user', internalToken.verifyToken, userRouter);
        this.app.use(ROOT_ROUTE + '/role', internalToken.verifyToken, roleRouter);
        this.app.use(ROOT_ROUTE + '/reset-password', resetPasswordRouter);
        //area
        this.app.use(ROOT_ROUTE + '/area', authAdmin.verifyAdmin, areaRouter);
        //level
        this.app.use(ROOT_ROUTE + '/level', authAdmin.verifyAdmin, levelRouter);
        //team
        this.app.use(ROOT_ROUTE + '/team', internalToken.verifyToken, teamRouter);
    }
}

module.exports = (app) => { return new RouterIndex(app) };