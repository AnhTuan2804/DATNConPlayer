'use strict';
var express = require('express');
var router = express.Router();
const os = require('os');

class MonitorRouter {
    registerRoutes() {
        router.route('/health')
            .get((req, res, next) => {
                let freeMem = os.freemem();
                let totalMem = os.totalmem();
                let averageLoad = os.loadavg();
                let totalCPUs = os.cpus();
                let uptime = os.uptime();
                let healthString = `free mem: ${freeMem}<br>total mem: ${totalMem}<br>used mem: ${totalMem - freeMem}<br>used mem ratio: ${(totalMem - freeMem)/totalMem}<br>average load: ${averageLoad}<br>cpus: ${totalCPUs.length}<br>uptime: ${uptime}`;
                //res.send('alive!!!');
                //console.log(healthString.replace(/<br>/g,'\n'));
                res.send(healthString);
            });

        return router;
    }
}

const monitorRouter = new MonitorRouter();
module.exports = monitorRouter.registerRoutes();