import Constants from '../../theme/variable/Constants';
import { Toast } from 'native-base';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import EncodeDecodeService from '../ui/share/util/EncodeDecodeService';
import Utils from '../ui/share/util/Utils';

// =================LOGIN - START==================
function* loginAPI(userID, password, device_info) {
    const router = 'login';
    const auth = `${userID}:${password}`;
    const encode = EncodeDecodeService.encode(auth);
    const headers = {
        'auth': encode,
        'device_info': device_info
    };
    const body = null;
    const response = yield fetch(`${Constants.HOST}/${router}`, {
        method: 'POST',
        headers: getHeaders(headers),
        body: body,
    }).then((response) => {
        return getResponse(response);
    }).catch((error) => {
        showError(error);
    });
    return response;
}
// =================LOGIN - END====================

// =================Profile - start==================
function* getProfileAPI() {
    const router = 'user/profile';
    let token = Constants.TOKEN;
    let headersPairs = {
        'token': token
    };
    const response = yield fetch(`${Constants.HOST}/${router}`, {
        method: 'GET',
        headers: getHeaders(headersPairs),
        body: '',
    }).then((response) => {
        return getResponse(response);
    }).catch((error) => {
        showError(error);
    });
    return response;
}
// =================Profile - end====================

// ==============FORGOT PASS - START===============
function* forgotPassAPI(email) {
    const router = `forgot-password/code?email=${email}`;
    const headersPairs = null;
    const response = yield fetch(`${Constants.HOST}/${router}`, {
        method: 'GET',
        headers: getHeaders(headersPairs),
        body: '',
    }).then((response) => {
        return getResponse(response);
    }).catch((error) => {
        showError(error);
    });
    return response;
}
// ==============FORGOT PASS  - END================

// ==============CHANGE PASS - START===============
function* changePassAPI(email, code, password) {
    const router = `forgot-password/change-password`;
    const headersPairs = null;
    const body = JSON.stringify({
        'email': email,
        'code': code,
        'password': EncodeDecodeService.encode(password)
    });

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
// ==============CHANGE PASS - END=================

// ============CHANGE USER ID - START==============
function* forgotUserIDAPI(email) {
    const router = 'recovery-code';
    const headersPairs = null;
    const body = JSON.stringify({
        'email': email
    });

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
// ============CHANGE USER ID - END================

// =========LIST ADDRESS WITHDRAW - START==========
function* getListAddressWithdraw() {
    const router = `withdraw/get-list`;
    let token = Constants.TOKEN;
    let headersPairs = {
        'token': token
    };

    const response = yield fetch(`${Constants.HOST}/${router}`, {
        method: 'GET',
        headers: getHeaders(headersPairs),
        body: '',
    }).then((response) => {
        return getResponse(response);
    }).catch((error) => {
        showError(error);
    });
    return response;
}
// =========LIST ADDRESS WITHDRAW  - END===========


// =================COMMON - START=================
function getResponse(response, isShowError) {
    if (response.status >= 400) {
        if (isShowError) {
            throw Error(Constants.MESSAGE_ERROR)
        }
        response.json().then((result) => {
            // INVALID TOKEN
            if (result.code === 102) {
                Actions.splashScreen({ type: 'reset' });
                Toast.show({
                    text: result.message,
                    buttonText: 'OK',
                    type: 'danger',
                    duration: 3000,
                    position: 'top'
                })
                return {}
            } else {
                Toast.show({
                    text: result.message,
                    buttonText: 'OK',
                    type: 'danger',
                    duration: 3000,
                    position: 'top'
                })
            }
        })

        // INVALID TOKEN OLD
        if (response.status === 402) {
            return {}
        } else {
            throw Error(Constants.MESSAGE_ERROR)
        }
    } else {
        return response.json().then((result) => {
            return result;
        });
    }
}

function getResponseInterval(response) {
    if (response.status >= 400) {
        response.json().then((result) => {
            // INVALID TOKEN
            if (result.code === 102) {
                Actions.splashScreen({ type: 'reset' });
                Toast.show({
                    text: result.message,
                    buttonText: 'OK',
                    type: 'danger',
                    duration: 3000,
                    position: 'top'
                })
                return {}
            }
        })
    } else {
        return response.json().then((result) => {
            return result;
        });
    }
}

function showError(error) {
    if (error.message != Constants.MESSAGE_ERROR) {
        alert('Runtime Error!');
    }
    throw Error(error.message);
}

//get header
function getHeaders(headersPairs) {
    let header = {
        'Content-Type': 'application/json',
    }
    if (headersPairs) {
        _.forEach(headersPairs, (value, key) => {
            header[key] = value;
        })
    }
    return header;
}
// =================COMMON - END=================

export const Api = {
    loginAPI,
    forgotPassAPI,
    changePassAPI,
    forgotUserIDAPI,
    getListAddressWithdraw,
    getProfileAPI
};
