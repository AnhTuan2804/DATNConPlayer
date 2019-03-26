'use strict';
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const config = require('../config/db.config')
const _ = require('lodash');
class MiddlewareIndex {
    constructor(app) {
        this.app = app;
    }
    configureMiddlewares() {
        //Middlewares
        this.app.options('*', cors()); //enable preflight for all routes
        //show console
        this.app.use(morgan("combined"));
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        this.app.use(cors({
            origin: config.whiteList,
            //origin: /\.muv-x\.com$/,
            methods: ['GET', 'PUT', 'POST', 'DELETE'],
            // allowedHeaders: [],
            preflightContinue: true
        }))
    }
}

module.exports = (app) => { return new MiddlewareIndex(app); }