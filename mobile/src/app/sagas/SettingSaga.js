import {
    IS_GET_PROFILE,
    GET_PROFILE_SUCCESSFULLY,
    GET_PROFILE_FAILED,
    IS_UPDATE_INFO,
    UPDATE_INFO_SUCCESSFULLY,
    UPDATE_INFO_FAILED,
    IS_CHANGE_PASS,
    CHANGE_PASS_SUCCESSFULLY,
    CHANGE_PASS_FAILED
} from '../actions/ActionTypes';
import { Actions } from 'react-native-router-flux';

//Saga effects
import { put, takeLatest, call } from 'redux-saga/effects';
import { Api } from './Api';
import ToastUtil from '../../theme/shared/utils/ToastUtil';
import Constants from '../../theme/variable/Constants';
import LoginService from '../../theme/shared/utils/LoginService';
import { getlistTeam } from '../actions/TeamActions';

function* getProfileSaga(action) {
    try {
        yield LoginService.getToken();
        const result = yield Api.getProfileAPI();
        Constants.EMAIL_ADDRESS = result.email
        Constants.TOKEN = result.token
        Constants.USER_ID = result.id
        Constants.PHONE = result.phone
        yield put({ type: GET_PROFILE_SUCCESSFULLY, userData: result });
        if (action.isHome) {
            yield put(getlistTeam())
        }
    } catch (error) {
        yield put({ type: GET_PROFILE_FAILED, error });
    }
}

export function* watchGetProfile() {
    yield takeLatest(IS_GET_PROFILE, getProfileSaga);
}

function* updateInfoSaga(action) {
    try {
        let body = JSON.stringify({
            "phone": action.value.phone,
            "fullname": action.value.fullname,
        });
        const updateInfoAPI = yield Api.updateInfoAPI(body);
        yield put({ type: UPDATE_INFO_SUCCESSFULLY, userData: updateInfoAPI });
        ToastUtil.showToast("Cập nhật thành công", 'success')
    } catch (error) {
        yield put({ type: UPDATE_INFO_FAILED, error });
    }
}

export function* watchUpdateInfo() {
    yield takeLatest(IS_UPDATE_INFO, updateInfoSaga);
}

function* changePassSaga(action) {
    try {
        let body = JSON.stringify({
            "currentPassword": action.value.oldPass,
            "newPassword": action.value.password
        });
        const changePassAPI = yield Api.changePassAPI(body);
        yield put({ type: CHANGE_PASS_SUCCESSFULLY });
        ToastUtil.showToast("Cập nhật thành công", 'success')
    } catch (error) {
        yield put({ type: CHANGE_PASS_FAILED, error });
    }
}

export function* watchchangePass() {
    yield takeLatest(IS_CHANGE_PASS, changePassSaga);
}