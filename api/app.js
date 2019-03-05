const express = require('express')
const app = express();
const monitorRouter = require('./routes/monitor');
const config = require('config')


//socket
let http = require('http').Server(app);

//Monitoring endpoint
app.use('/_ah', monitorRouter);

//configure middlewares
const middlewares = require('./middlewares')(app);
middlewares.configureMiddlewares();
//firebase
const configCommon = require('./shared/helpers/configCommon')
const admin = require("firebase-admin");
admin.initializeApp({
    credential: admin.credential.cert(configCommon.getGoogleCloud().keyfile),
    databaseURL: configCommon.getGoogleCloud().databaseURL
});
//configure routers
const routerIndex = require('./routes')(app);
routerIndex.registerRoutes();
//error
const generalErrorHandler = require('./shared/helpers/generalErrorHandler');
app.use(generalErrorHandler.handleError);
//port
const port = process.env.PORT || 8006;

// interval update transaction
// const interval = require('./core/wallet/checkConfirmations');
// interval();

//cron job
// const cronJob = require('./core/wallet/cronJob');
// cronJob.handleTx();
// cronJob.sendTx();
const i18n = require("i18n");

i18n.configure({
    locales: ['en', 'ja'],
    directory: __dirname + '/config/locales'
});
// console.log(i18n.__({
//     phrase: 'USER{{name}}',
//     locale: 'ja'
// },{ name: 'ABC' }));
// console.log(i18n.__({
//     phrase: 'USER',
//     locale: 'ja'
// }).ABC);
//database

if (process.env.MODE_BUILD == 'prod') {
    var fs = require('fs');
    var https = require('https');
    var options = {
        key: fs.readFileSync('/etc/nginx/ssl/server.key'),
        cert: fs.readFileSync('/etc/nginx/ssl/server.crt'),
        //  requestCert: true,
        // rejectUnauthorized: false
    };
    https.createServer(options, app).listen(8080, () => {
        console.log(`Server running at http://:${port}/`)
    });
} else {
    http.listen(port, () => {
        console.log(`Server running at http://:${port}/`)
    });
}

module.exports = app;