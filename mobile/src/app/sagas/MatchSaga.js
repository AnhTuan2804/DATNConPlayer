import {

    IS_CREATE_MATCH,
    CREATE_MATCH_SUCCESSFULLY,
    CREATE_MATCH_FAILED,

    IS_UPDATE_MATCH,
    UPDATE_MATCH_SUCCESSFULLY,
    UPDATE_MATCH_FAILED,


    // IS_CANCLE_MATCH,
    // CANCLE_MATCH_SUCCESSFULLY,
    // CANCLE_MATCH_FAILED,

} from '../actions/ActionTypes';

//Saga effects
import { put, takeLatest } from 'redux-saga/effects';
import { Api } from './Api';
import ToastUtil from '../../theme/shared/utils/ToastUtil';
import Constants from '../../theme/variable/Constants';
import { Actions } from 'react-native-router-flux';

// create team
function* createMatchSaga(action) {
    try {
        let body = JSON.stringify(action.value);
        const result = yield Api.createMatchAPI(body);
        yield put({ type: CREATE_MATCH_SUCCESSFULLY });
        ToastUtil.showToast(Constants.MESSAGE_CREATE_SUCCESS, 'success')
        Actions.Manage()
    } catch (error) {
        yield put({ type: CREATE_MATCH_FAILED, error });
    }
}

export function* watchCreateMatchSaga() {
    yield takeLatest(IS_CREATE_MATCH, createMatchSaga);
}

// update team
function* updateMatchSaga(action) {
    try {
        let body = JSON.stringify(action.value);
        const result = yield Api.updateMatchAPI(body);
        yield put({ type: UPDATE_MATCH_SUCCESSFULLY });
        ToastUtil.showToast(Constants.MESSAGE_UPDATE_SUCCESS, 'success')
        if (action.isManage) {
            Actions.Manage()
        }
    } catch (error) {
        yield put({ type: UPDATE_MATCH_FAILED, error });
    }
}

export function* watchUpdateMatchSaga() {
    yield takeLatest(IS_UPDATE_MATCH, updateMatchSaga);
}