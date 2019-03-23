'use strict';
const config = require('config')
const MODE_BUILD = process.env.MODE_BUILD || 'local';
class ConfigCommon {
    getKeyFile() {
        switch (MODE_BUILD) {
            case 'local':
                return config.googleCloud.keyfileLocal;
            case 'dev':
                return config.googleCloud.keyfileDev;
        }
        return config.googleCloud.keyfileLocal;
    }

    getDatabaseUrl() {
        switch (MODE_BUILD) {
            case 'local':
                return config.databaseURLLocal;
            case 'dev':
                return config.databaseURLDev;
        }
        return config.databaseURLLocal;
    }

    getDb() {
        switch (MODE_BUILD) {
            case 'local':
                return config.dbLocal;
            case 'dev':
                return config.dbDev;
        }
        return config.dbLocal;
    }
}
module.exports = new ConfigCommon();