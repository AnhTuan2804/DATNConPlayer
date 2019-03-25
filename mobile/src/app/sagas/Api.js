import Constants from '../../theme/variable/Constants';
import { Toast } from 'native-base';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
// import EncodeDecodeService from '../../theme/shared/utils/EncodeDecodeService';
import Utils from '../../theme/shared/utils/Utils';

// =================LOGIN - START==================
function* loginAPI(bodyLogin) {
    const router = 'login';
    const headersPairs = null;
    const body = bodyLogin
    console.log(body);
    const response = yield fetch(`${Constants.HOST}/${router}`, {
        method: 'POST',
        headers: getHeaders(headersPairs),
        body: body,
    }).then((response) => {
        console.log("--------success-------------");
        return getResponse(response);
    }).catch((error) => {
        console.log(error);
        showError(error);
    });
    return response;
}
// =================LOGIN - END====================


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
    // forgotPassAPI,
    // changePassAPI,
    // forgotUserIDAPI,
    // getListAddressWithdraw,
    // getProfileAPI
};
