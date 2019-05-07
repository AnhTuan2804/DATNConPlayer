import {

    IS_CREATE_MATCH,
    CREATE_MATCH_SUCCESSFULLY,
    CREATE_MATCH_FAILED,

    IS_UPDATE_MATCH,
    UPDATE_MATCH_SUCCESSFULLY,
    UPDATE_MATCH_FAILED,


    IS_CANCLE_MATCH,
    CANCLE_MATCH_SUCCESSFULLY,
    CANCLE_MATCH_FAILED,

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
        console.log(result);
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
        let body = JSON.stringify({
            "name": action.value.name,
            "age_max": action.value.age_max,
            "age_min": action.value.age_min,
            "level_id": action.value.level_id,
            "area_id": action.value.area_id,
            "picture": action.value.picture,
            "description": action.value.description,
            "id": action.value.id
        });
        const result = yield Api.updateTeamAPI(body);
        yield put({ type: UPDATE_MATCH_SUCCESSFULLY });
        ToastUtil.showToast(Constants.MESSAGE_UPDATE_SUCCESS, 'success')
    } catch (error) {
        yield put({ type: UPDATE_MATCH_FAILED, error });
    }
}

export function* watchUpdateMatchSaga() {
    yield takeLatest(IS_UPDATE_MATCH, updateMatchSaga);
}

// delete team
function* cancleMatchSaga(action) {
    try {
        let body = JSON.stringify({
            "id": action.id
        });
        const result = yield Api.delTeamAPI(body);
        yield put({ type: CANCLE_MATCH_SUCCESSFULLY });
        ToastUtil.showToast(Constants.MESSAGE_DELETE_SUCCESS, 'success')
    } catch (error) {
        yield put({ type: CANCLE_MATCH_FAILED, error });
    }
}

export function* watchCancleMatchSaga() {
    yield takeLatest(IS_CANCLE_MATCH, cancleMatchSaga);
}
