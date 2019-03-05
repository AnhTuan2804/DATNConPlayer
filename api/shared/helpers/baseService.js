const _ = require('lodash');
const axios = require('axios');

async function postData(url, header, data) {
    const result = await axios({
        method: 'POST', // you can set what request you want to be
        url,
        data,
        headers: _.merge({
            'Content-Type': 'application/json',
        }, header)
    })
    return result;
}

async function postDataFormUrlEncode(url, header, data) {
    const result = await axios({
        method: 'POST', // you can set what request you want to be
        url,
        data,
        headers: _.merge({
            'Content-Type': 'application/x-www-form-urlencoded'
        }, header)
    })
    return result;
}

async function getData(url, header, params = null) {
    const result = await axios({
        method: 'GET', // you can set what request you want to be
        url,
        params,
        headers: _.merge({
            'Content-Type': 'application/json',
        }, header)
    })
    return result;
}
module.exports = {
    postData,
    getData,
    postDataFormUrlEncode
}
