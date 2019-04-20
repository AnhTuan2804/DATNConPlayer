import {
    IS_UPDATE_INFO,
    UPDATE_INFO_SUCCESSFULLY,
    UPDATE_INFO_FAILED,
    IS_CHANGE_PASS,
    CHANGE_PASS_SUCCESSFULLY,
    CHANGE_PASS_FAILED
} from '../actions/ActionTypes';
import { Actions } from 'react-native-router-flux';

//Saga effects
import { put, takeLatest } from 'redux-saga/effects';
import { Api } from './Api';
import ToastUtil from '../../theme/shared/utils/ToastUtil';
import Constants from '../../theme/variable/Constants';

function* updateInfoSaga(action) {
    try {
        let body = JSON.stringify({
            "team": {
                "phone": action.value.phone,
                "fullname": action.value.fullName,
            }
        });
        const updateInfoAPI = yield Api.updateInfoAPI(body);
        // const infoUserAPI = yield Api.getProfileAPI();
        yield put({ type: UPDATE_INFO_SUCCESSFULLY });
        ToastUtil.showToast("Cập nhật thành công", 'success')
        // Actions.loginScreen()
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

        // Actions.loginScreen()
    } catch (error) {
        yield put({ type: CHANGE_PASS_FAILED, error });
    }
}

export function* watchchangePass() {
    yield takeLatest(IS_CHANGE_PASS, changePassSaga);
}