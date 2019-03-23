const express = require('express');
const app = express();
const monitorRouter = require('./routes/monitor');
const config = require('config');
const mysql = require('mysql');
const db = require('./shared/db/db');


//socket
let http = require('http').Server(app);

//Monitoring endpoint
app.use('/_ah', monitorRouter);

//configure middlewares
const middlewares = require('./middlewares')(app);
middlewares.configureMiddlewares();

//firebase
const configCommon = require('./shared/helpers/configCommon');
const admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.cert(configCommon.getGoogleCloud().keyfile),
    databaseURL: configCommon.getGoogleCloud().databaseURL
});

// var connection = mysql.createConnection({
//     host: 'sql10.freemysqlhosting.net',
//     user: 'sql10284795',
//     password: 'j4ALCJYcFG',
//     database: 'sql10284795'
// })

// connection.connect((err) => {
//     if (err) {
//         console.log('Faild')
//     } else {
//         console.log('OK');
//     }
// });

// configure routers
const routerIndex = require('./routes')(app);
routerIndex.registerRoutes();

//error
const generalErrorHandler = require('./shared/helpers/generalErrorHandler');
app.use(generalErrorHandler.handleError);
//port
const port = process.env.PORT || 8088;

db.connect().then((sql) => {
    return http.listen(port, () => {
        console.log(`Server running at http://:${port}/`)
    });
}).catch((err) => {
    console.log('Fail when connect to Mysql: ' + err)
})

module.exports = app;