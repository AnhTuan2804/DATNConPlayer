const express = require('express');
const app = express();
const config = require('./config/db.config');
const db = require('./shared/db/db');


//socket
let http = require('http').Server(app);

//configure middlewares
const middlewares = require('./middlewares')(app);
middlewares.configureMiddlewares();

//firebase
// const admin = require('firebase-admin');
// admin.initializeApp({
//     credential: admin.credential.cert(config.googleCloud.keyfile),
//     databaseURL: config.googleCloud.databaseURL
// });

// configure routers
const routerIndex = require('./routes')(app);
routerIndex.registerRoutes();

//error
const generalErrorHandler = require('./shared/generalErrorHandler');
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