const routes = require('express').Router();
const loginRouter = require('./login');
const userRouter = require('./user');
const roleRouter = require('./role');
const areaRouter = require('./area');
const timeRouter = require('./time');
const teamRouter = require('./team');
const priceOnTimeRouter = require('./price_on_time');
const gridironRouter = require('./gridiron');
const matchRouter = require('./match');
const sizeGridironRouter = require('./size_gridiron');
const levelRouter = require('./level');
const careerRouter = require('./career');
const resetPasswordRouter = require('./resetPassword');
const internalToken = require('../middlewares/internalToken.local');
const authAdmin = require('../middlewares/auth-admin.local');
const auth = require('../middlewares/auth.local');
const registerRouter = require('./register');

const publicRouter = require('./public');
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
        this.app.use(ROOT_ROUTE + '/role', roleRouter);
        this.app.use(ROOT_ROUTE + '/reset-password', resetPasswordRouter);
        //area
        this.app.use(ROOT_ROUTE + '/area', areaRouter);
        //time
        this.app.use(ROOT_ROUTE + '/time', timeRouter);
        //level
        this.app.use(ROOT_ROUTE + '/level', levelRouter);
        //career
        this.app.use(ROOT_ROUTE + '/career', careerRouter);
        //price on time
        this.app.use(ROOT_ROUTE + '/price-on-time', priceOnTimeRouter);
        //size gridiron
        this.app.use(ROOT_ROUTE + '/size-gridiron', sizeGridironRouter);
        //team
        this.app.use(ROOT_ROUTE + '/team', internalToken.verifyToken, teamRouter);
        //gridiron
        this.app.use(ROOT_ROUTE + '/gridiron', internalToken.verifyToken, gridironRouter);
        //match
        this.app.use(ROOT_ROUTE + '/match', internalToken.verifyToken, matchRouter);

        //public
        this.app.use(ROOT_ROUTE + '/public', publicRouter);
    }
}

module.exports = (app) => { return new RouterIndex(app) };