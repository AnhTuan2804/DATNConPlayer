import Constants from '../../theme/variable/Constants';
import { Toast } from 'native-base';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import Utils from '../../theme/shared/utils/Utils';
import ToastUtil from '../../theme/shared/utils/ToastUtil';
import EncryptionService from '../../theme/shared/utils/EncryptionService'


// =================LOGIN - START==================
function* loginAPI(authlogin) {
    const router = 'login';
    // let auth = EncryptionService.encodeBase64(authlogin)
    const headersPairs = {
        // 'auth': auth
    };
    const body = authlogin
    const response = yield fetch(`${Constants.HOST}/${router}`, {
        method: 'POST',
        headers: getHeaders(headersPairs),
        body: body,
    }).then((response) => {
        return getResponse(response);
    }).catch((error) => {
        showError(error);
    });
    return response;
}
// =================LOGIN - END====================

// =================Register - START==================
function* registerAPI(authRegister) {
    const router = 'register';
    let auth = EncryptionService.encodeBase64(authRegister)
    const headersPairs = {
        'auth': auth
    };
    const body = null
    const response = yield fetch(`${Constants.HOST}/${router}`, {
        method: 'POST',
        headers: getHeaders(headersPairs),
        body: body,
    }).then((response) => {
        return getResponse(response);
    }).catch((error) => {
        console.log('errr', error);
        showError(error);
    });
    return response;
}

// =================Register - START==================


// -------------------common----------------------------------
function getResponse(response, isShowError) {
    if (response.status >= 400) {
        if (isShowError) {
            return response.json().then((result) => {
                throw Error(result.message)
            });
        }
        response.json().then((result) => {
            if (result.message && !(result.message instanceof Object))
                ToastUtil.showToast(result.message, 'danger');
        })
        //token1
        if (response.status == 402) {
            // Actions.loginScreen({ type: 'reset' });
            return {}
        } else {
            return response.json().then((result) => {
                throw Error(result.message)
            });
        }
    } else {
        return response.json().then((result) => {
            return result;
        });
    }
}

function showError(error) {
    if (error.message == 'Network request failed') {
        Alert.alert('Warning', 'Poor connecting!!');
    }
    throw Error(error.message);
}

function timeout(ms, promise) {
    return new Promise(function (resolve, reject) {
        const timeoutId = setTimeout(function () {
            reject(Alert.alert('Warning', 'Bad connect to server!'));
        }, ms)
        promise.then(
            (res) => {
                clearTimeout(timeoutId);
                resolve(res);
            },
            (err) => {
                clearTimeout(timeoutId);
                reject(err);
            }
        );
    })
}

// get header
function getHeaders(headersPairs) {
    let header = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
    if (headersPairs) {
        _.forEach(headersPairs, (value, key) => {
            header[key] = value;
        })
    }
    return header;
}


function getHeadersByToken(headersPairs) {
    let header = {
        'token': Constants.TOKEN,
        'locale': Constants.LOCALE || 'en',
        'Accept': 'application/json',
        "Content-Type": 'application/json'
    }
    if (headersPairs) {
        _.forEach(headersPairs, (value, key) => {
            header[key] = value;
        })
    }
    return header;
}
// ----------------------common------------------------

export const Api = {
    loginAPI,
    registerAPI,
    // changePassAPI,
    // forgotUserIDAPI,
    // getListAddressWithdraw,
    // getProfileAPI
};
