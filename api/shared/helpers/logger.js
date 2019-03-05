const debug = require('debug');

const appPrefix = 'api'

function getLogger(name) {
    const logger = debug(`${appPrefix}:${name}`);
    return logger;
}

module.exports = {
    getLogger
}
