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
        const list = yield Api.getAreaAPI();
        console.log(list)
        yield put({ type: GET_LIST_AREA_SUCCESSFULLY, listArea: list });
        // ToastUtil.showToast(forgotPassAPI.message, 'success')
        // Actions.loginScreen()
    } catch (error) {
        yield put({ type: GET_LIST_AREA_FAILED, error });
    }
}

export function* watchGetListArea() {
    yield takeLatest(IS_GET_LIST_AREA, getListAreaSaga);
}

// getListLever
function* getListLevelSaga(action) {
    try {
        const list = yield Api.getLevelAPI();
        console.log(list);
        yield put({ type: GET_LIST_LEVEL_SUCCESSFULLY, listLevel: list });
        // ToastUtil.showToast(forgotPassAPI.message, 'success')
        // Actions.loginScreen()
    } catch (error) {
        yield put({ type: GET_LIST_LEVEL_FAILED, error });
    }
}

export function* watchGetListLevelSaga() {
    yield takeLatest(IS_GET_LIST_LEVEL, getListLevelSaga);
}

// getListTime
function* getListTimeSaga(action) {
    try {
        const list = yield Api.getTimeAPI();
        console.log(list);
        yield put({ type: GET_LIST_TIME_SUCCESSFULLY, listTime: list });
        // ToastUtil.showToast(forgotPassAPI.message, 'success')
        // Actions.loginScreen()
    } catch (error) {
        yield put({ type: GET_LIST_TIME_FAILED, error });
    }
}

export function* watchGetListTimeSaga() {
    yield takeLatest(IS_GET_LIST_TIME, getListTimeSaga);
}
// getListCareer
function* getListCareerSaga(action) {
    try {
        const list = yield Api.getCareerAPI();
        console.log(list);
        yield put({ type: GET_LIST_CAREER_SUCCESSFULLY, listCareer: list });
        // ToastUtil.showToast(forgotPassAPI.message, 'success')
        // Actions.loginScreen()
    } catch (error) {
        yield put({ type: GET_LIST_CAREER_FAILED, error });
    }
}

export function* watchGetListCareerSaga() {
    yield takeLatest(IS_GET_LIST_CAREER, getListCareerSaga);
}
// getListSize
function* getListSizeSaga(action) {
    try {
        const list = yield Api.getSizeAPI();
        console.log("list sizeeeeeeeeeee", list);
        yield put({ type: GET_LIST_SIZE_SUCCESSFULLY, listSize: list });
        // ToastUtil.showToast(forgotPassAPI.message, 'success')
        // Actions.loginScreen()
    } catch (error) {
        yield put({ type: GET_LIST_SIZE_FAILED, error });
    }
}

export function* watchGetListSizeSaga() {
    yield takeLatest(IS_GET_LIST_SIZE, getListSizeSaga);
}