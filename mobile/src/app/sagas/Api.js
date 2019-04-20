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
    let auth = EncryptionService.encodeBase64(authlogin)
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
        showError(error);
    });
    return response;
}
// =================LOGIN - END====================

// =================Register - START==================
function* registerAPI(authRegister, bodyRegister) {
    const router = 'register';
    let auth = EncryptionService.encodeBase64(authRegister)
    const headersPairs = {
        'auth': auth
    };
    const body = bodyRegister
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

// =================Register - START==================

// =================ForgotPass - START==================
function* forgotPassAPI(bodyForgotPass) {
    console.log(bodyForgotPass);
    const router = 'reset-password';
    const headersPairs = null;
    const body = bodyForgotPass
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

// =================ForgotPass - START==================
// =================ChangePass - START==================
function* changePassAPI(bodyChangePass) {
    console.log(bodyChangePass);
    const router = 'user/change-password';
    const headersPairs = null;
    const body = bodyChangePass
    const response = yield fetch(`${Constants.HOST}/${router}`, {
        method: 'POST',
        headers: getHeadersByToken(headersPairs),
        body: body,
    }).then((response) => {
        return getResponse(response);
    }).catch((error) => {
        showError(error);
    });
    return response;
}

// =================Update profile - START==================
function* updateInfoAPI(bodyInfo) {
    console.log(bodyInfo);
    const router = 'user/update-profile';
    const headersPairs = null;
    const body = bodyInfo
    const response = yield fetch(`${Constants.HOST}/${router}`, {
        method: 'POST',
        headers: getHeadersByToken(headersPairs),
        body: body,
    }).then((response) => {
        return getResponse(response);
    }).catch((error) => {
        showError(error);
    });
    return response;
}

// =================Update profile - START==================
function* getProfileAPI() {
    const router = 'user/profile';
    const headersPairs = null;
    const body = null
    const response = yield fetch(`${Constants.HOST}/${router}`, {
        method: 'get',
        headers: getHeadersByToken(headersPairs),
        body: body,
    }).then((response) => {
        return getResponse(response);
    }).catch((error) => {
        showError(error);
    });
    return response;
}


//------------------------------------------------------------------------
// =================AREA - START==================
function* getAreaAPI() {
    const router = 'area/get-list';
    const headersPairs = null;
    const body = null
    const response = yield fetch(`${Constants.HOST}/${router}`, {
        method: 'get',
        headers: getHeaders(headersPairs),
        body: body,
    }).then((response) => {
        return getResponse(response);
    }).catch((error) => {
        showError(error);
    });
    return response;
}

// =================LEVEL - START==================
function* getLevelAPI() {
    const router = 'level/get-list';
    const headersPairs = null;
    const body = null
    const response = yield fetch(`${Constants.HOST}/${router}`, {
        method: 'get',
        headers: getHeaders(headersPairs),
        body: body,
    }).then((response) => {
        return getResponse(response);
    }).catch((error) => {
        showError(error);
    });
    return response;
}

// =================SIZE - START==================
function* getSizeAPI() {
    const router = 'size/get-list';
    const headersPairs = null;
    const body = null
    const response = yield fetch(`${Constants.HOST}/${router}`, {
        method: 'get',
        headers: getHeaders(headersPairs),
        body: body,
    }).then((response) => {
        return getResponse(response);
    }).catch((error) => {
        showError(error);
    });
    return response;
}

// =================CAREER - START==================
function* getCareerAPI() {
    const router = 'career/get-list';
    const headersPairs = null;
    const body = null
    const response = yield fetch(`${Constants.HOST}/${router}`, {
        method: 'get',
        headers: getHeaders(headersPairs),
        body: body,
    }).then((response) => {
        return getResponse(response);
    }).catch((error) => {
        showError(error);
    });
    return response;
}

// =================TIME - START==================
function* getTimeAPI() {
    const router = 'time/get-list';
    const headersPairs = null;
    const body = null
    const response = yield fetch(`${Constants.HOST}/${router}`, {
        method: 'get',
        headers: getHeaders(headersPairs),
        body: body,
    }).then((response) => {
        return getResponse(response);
    }).catch((error) => {
        showError(error);
    });
    return response;
}

// =================TEAM - START==================
function* getListTeamAPI() {
    const router = 'team/get-list-for-user';
    const headersPairs = null;
    const body = null
    const response = yield fetch(`${Constants.HOST}/${router}`, {
        method: 'get',
        headers: getHeadersByToken(headersPairs),
        body: body,
    }).then((response) => {
        return getResponse(response);
    }).catch((error) => {
        showError(error);
    });
    return response;
}

function* createTeam(bodyInfo) {
    const router = 'team/create';
    const headersPairs = null;
    const body = bodyInfo
    const response = yield fetch(`${Constants.HOST}/${router}`, {
        method: 'POST',
        headers: getHeadersByToken(headersPairs),
        body: body,
    }).then((response) => {
        return getResponse(response);
    }).catch((error) => {
        showError(error);
    });
    return response;
}

function* updateTeam(bodyInfo) {
    const router = 'team/update';
    const headersPairs = null;
    const body = bodyInfo
    const response = yield fetch(`${Constants.HOST}/${router}`, {
        method: 'POST',
        headers: getHeadersByToken(headersPairs),
        body: body,
    }).then((response) => {
        return getResponse(response);
    }).catch((error) => {
        showError(error);
    });
    return response;
}

function* delTeam(bodyInfo) {
    const router = 'team/update';
    const headersPairs = null;
    const body = bodyInfo
    const response = yield fetch(`${Constants.HOST}/${router}`, {
        method: 'POST',
        headers: getHeadersByToken(headersPairs),
        body: body,
    }).then((response) => {
        return getResponse(response);
    }).catch((error) => {
        showError(error);
    });
    return response;
}

function* getTeamDetailAPI(id) {
    const router = `team/detail?id=${id}`;
    const headersPairs = null;
    const body = null
    const response = yield fetch(`${Constants.HOST}/${router}`, {
        method: 'get',
        headers: getHeadersByToken(headersPairs),
        body: body,
    }).then((response) => {
        return getResponse(response);
    }).catch((error) => {
        showError(error);
    });
    return response;
}


function* addMember(bodyInfo) {
    const router = 'team/add-member';
    const headersPairs = null;
    const body = bodyInfo
    const response = yield fetch(`${Constants.HOST}/${router}`, {
        method: 'POST',
        headers: getHeadersByToken(headersPairs),
        body: body,
    }).then((response) => {
        return getResponse(response);
    }).catch((error) => {
        showError(error);
    });
    return response;
}

function* delMember(bodyInfo) {
    const router = 'team/delete-member';
    const headersPairs = null;
    const body = bodyInfo
    const response = yield fetch(`${Constants.HOST}/${router}`, {
        method: 'POST',
        headers: getHeadersByToken(headersPairs),
        body: body,
    }).then((response) => {
        return getResponse(response);
    }).catch((error) => {
        showError(error);
    });
    return response;
}

// =================GRIDIRON - START==================
function* getListGridironAPI() {
    const router = 'gridiron/get-list-for-user';
    const headersPairs = null;
    const body = null
    const response = yield fetch(`${Constants.HOST}/${router}`, {
        method: 'get',
        headers: getHeadersByToken(headersPairs),
        body: body,
    }).then((response) => {
        return getResponse(response);
    }).catch((error) => {
        showError(error);
    });
    return response;
}

function* createGridiron(bodyInfo) {
    const router = 'gridiron/create';
    const headersPairs = null;
    const body = bodyInfo
    const response = yield fetch(`${Constants.HOST}/${router}`, {
        method: 'POST',
        headers: getHeadersByToken(headersPairs),
        body: body,
    }).then((response) => {
        return getResponse(response);
    }).catch((error) => {
        showError(error);
    });
    return response;
}

function* updateGridiron(bodyInfo) {
    const router = 'gridiron/update';
    const headersPairs = null;
    const body = bodyInfo
    const response = yield fetch(`${Constants.HOST}/${router}`, {
        method: 'POST',
        headers: getHeadersByToken(headersPairs),
        body: body,
    }).then((response) => {
        return getResponse(response);
    }).catch((error) => {
        showError(error);
    });
    return response;
}

function* delGridiron(bodyInfo) {
    const router = 'gridiron/update';
    const headersPairs = null;
    const body = bodyInfo
    const response = yield fetch(`${Constants.HOST}/${router}`, {
        method: 'POST',
        headers: getHeadersByToken(headersPairs),
        body: body,
    }).then((response) => {
        return getResponse(response);
    }).catch((error) => {
        showError(error);
    });
    return response;
}

function* getGridironDetailAPI(id) {
    const router = `gridiron/detail?id=${id}`;
    const headersPairs = null;
    const body = null
    const response = yield fetch(`${Constants.HOST}/${router}`, {
        method: 'get',
        headers: getHeadersByToken(headersPairs),
        body: body,
    }).then((response) => {
        return getResponse(response);
    }).catch((error) => {
        showError(error);
    });
    return response;
}

function* addSubGridiron(bodyInfo) {
    const router = 'gridiron/create-sub-gridiron';
    const headersPairs = null;
    const body = bodyInfo
    const response = yield fetch(`${Constants.HOST}/${router}`, {
        method: 'POST',
        headers: getHeadersByToken(headersPairs),
        body: body,
    }).then((response) => {
        return getResponse(response);
    }).catch((error) => {
        showError(error);
    });
    return response;
}

function* delSubGridiron(bodyInfo) {
    const router = 'gridiron/delete-sub';
    const headersPairs = null;
    const body = bodyInfo
    const response = yield fetch(`${Constants.HOST}/${router}`, {
        method: 'POST',
        headers: getHeadersByToken(headersPairs),
        body: body,
    }).then((response) => {
        return getResponse(response);
    }).catch((error) => {
        showError(error);
    });
    return response;
}

function* addPriceOnTime(bodyInfo) {
    const router = 'price-on-time/create';
    const headersPairs = null;
    const body = bodyInfo
    const response = yield fetch(`${Constants.HOST}/${router}`, {
        method: 'POST',
        headers: getHeadersByToken(headersPairs),
        body: body,
    }).then((response) => {
        return getResponse(response);
    }).catch((error) => {
        showError(error);
    });
    return response;
}

function* delPriceOnTime(bodyInfo) {
    const router = 'price-on-time/delete';
    const headersPairs = null;
    const body = bodyInfo
    const response = yield fetch(`${Constants.HOST}/${router}`, {
        method: 'POST',
        headers: getHeadersByToken(headersPairs),
        body: body,
    }).then((response) => {
        return getResponse(response);
    }).catch((error) => {
        showError(error);
    });
    return response;
}

//----------------------------------------------------------------------------------

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
    forgotPassAPI,
    changePassAPI,
    getProfileAPI,
    updateInfoAPI,
    getAreaAPI,
    getLevelAPI,
    getSizeAPI,
    getTimeAPI,
    getCareerAPI,
    getListTeamAPI,
    createTeam,
    updateTeam,
    delMember,
    delTeam,
    addMember,
    getTeamDetailAPI,
    getListGridironAPI,
    createGridiron,
    updateGridiron,
    delGridiron,
    addSubGridiron,
    delSubGridiron,
    addPriceOnTime,
    delPriceOnTime,
    getGridironDetailAPI
};