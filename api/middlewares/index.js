'use strict';
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const configCommon = require('../shared/helpers/configCommon')
const _ = require('lodash');
class MiddlewareIndex {
    constructor(app) {
        this.app = app;
    }
    configureMiddlewares() {
        //Middlewares
        this.app.use(function (req, res, next) {
            console.log('ip', req.ip, req.headers.host, req.get('host'), req.get('origin'))
            if (configCommon.getWhiteList() != '*') {
                let org = req.get('origin');
                let ip = req.ip.replace('::ffff:', '');
                if (!(_.find(configCommon.getWhiteList(), (o) => {
                    return o == org;
                }) || _.find(configCommon.getWhiteList(), (o) => {
                    return o == ip;
                }))) {
                    next(100);
                }
            }
            next();
        })
            .options('*', cors())
        //show console
        this.app.use(morgan("combined"));
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        this.app.use(cors({
            origin: configCommon.getWhiteList(),
            //origin: /\.muv-x\.com$/,
            methods: ['GET', 'PUT', 'POST', 'DELETE'],
            // allowedHeaders: [],
            preflightContinue: true
        }))
        // this.app.use(tctTimeAccess.verifyTimeAccess);
    }
}

module.exports = (app) => { return new MiddlewareIndex(app); }