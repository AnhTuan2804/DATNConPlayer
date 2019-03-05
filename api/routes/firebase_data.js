var express = require('express');
var router = express.Router();
const _ = require('lodash');
const firebaseCommon = require('../shared/helpers/firebaseCommon')
const resHelper = require('../shared/helpers/resHelper')

class FirebaseData {
    firebaseRouters() {
        router.route('').post(async (req, res) => {
            let type = req.header('type');
            let body = req.body;
            try {
                let response;
                if (type == 'create') {
                    response = await firebaseCommon.create(body, req.header('url'))
                } else if (type == 'detail') {
                    response = await firebaseCommon.read(req.header('url'))
                } else if (type == 'delete') {
                    response = await firebaseCommon.remove(req.header('url'))
                } else {
                    response = await firebaseCommon.update(body, req.header('url'))
                }
                resHelper.sendResponse(res, { message: response })
            } catch (error) {
                resHelper.sendError(res, error)
            }
        });
        return router;
    }

}
const firebaseData = new FirebaseData();
module.exports = firebaseData.firebaseRouters();