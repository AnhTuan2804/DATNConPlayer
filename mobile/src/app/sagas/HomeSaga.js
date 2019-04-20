import {
    IS_GET_LIST_AREA,
    GET_LIST_AREA_SUCCESSFULLY,
    GET_LIST_AREA_FAILED,

    // getListLever
    IS_GET_LIST_LEVEL,
    GET_LIST_LEVEL_SUCCESSFULLY,
    GET_LIST_LEVEL_FAILED,

    // getListSize
    IS_GET_LIST_SIZE,
    GET_LIST_SIZE_SUCCESSFULLY,
    GET_LIST_SIZE_FAILED,

    // getListCareer
    IS_GET_LIST_CAREER,
    GET_LIST_CAREER_SUCCESSFULLY,
    GET_LIST_CAREER_FAILED,

    // getListTime
    IS_GET_LIST_TIME,
    GET_LIST_TIME_SUCCESSFULLY,
    GET_LIST_TIME_FAILED,
} from '../actions/ActionTypes';

import { Actions } from 'react-native-router-flux';
//Saga effects
import { put, takeLatest } from 'redux-saga/effects';
import { Api } from './Api';
import ToastUtil from '../../theme/shared/utils/ToastUtil';
import Constants from '../../theme/variable/Constants';
import { Toast } from 'native-base';

// getListArea
function* getListAreaSaga(action) {
    try {
        const listAreaAPI = yield Api.getAreaAPI();
        yield put({ type: GET_LIST_AREA_SUCCESSFULLY, listArea: listAreaAPI });
        ToastUtil.showToast(forgotPassAPI.message, 'success')
        // Actions.loginScreen()
    } catch (error) {
        yield put({ type: GET_LIST_AREA_FAILED, error });
    }
}

export function* watchGetListArea() {
    yield takeLatest(IS_GET_LIST_AREA, getListAreaSaga);
}

// getListLever

// getListSize

// getListCareer
// getListTime