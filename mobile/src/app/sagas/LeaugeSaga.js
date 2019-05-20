import {
    IS_CREATE_LEAUGE,
    CREATE_LEAUGE_SUCCESSFULLY,
    CREATE_LEAUGE_FAILED,

    IS_UPDATE_LEAUGE,
    UPDATE_LEAUGE_SUCCESSFULLY,
    UPDATE_LEAUGE_FAILED,

    IS_DEL_LEAUGE,
    DEL_LEAUGE_SUCCESSFULLY,
    DEL_LEAUGE_FAILED,

} from '../actions/ActionTypes';

//Saga effects
import { put, takeLatest } from 'redux-saga/effects';
import { Api } from './Api';
import ToastUtil from '../../theme/shared/utils/ToastUtil';
import Constants from '../../theme/variable/Constants';
import { Actions } from 'react-native-router-flux';

// create team
function* createLeaugeSaga(action) {
    try {
        let body = JSON.stringify(action.value);
        const result = yield Api.createLeaugeAPI(body);
        yield put({ type: CREATE_LEAUGE_SUCCESSFULLY });
        ToastUtil.showToast(Constants.MESSAGE_CREATE_SUCCESS, 'success')
        Actions.Tournament()
    } catch (error) {
        yield put({ type: CREATE_LEAUGE_FAILED, error });
    }
}

export function* watchCreateLeaugeSaga() {
    yield takeLatest(IS_CREATE_LEAUGE, createLeaugeSaga);
}

// update team
function* updateLeaugeSaga(action) {
    try {
        let body = JSON.stringify(action.value);
        const result = yield Api.updateLeaugeAPI(body);
        yield put({ type: UPDATE_LEAUGE_SUCCESSFULLY });
        ToastUtil.showToast(Constants.MESSAGE_UPDATE_SUCCESS, 'success')
    } catch (error) {
        yield put({ type: UPDATE_LEAUGE_FAILED, error });
    }
}

export function* watchUpdateLeaugeSaga() {
    yield takeLatest(IS_UPDATE_LEAUGE, updateLeaugeSaga);
}

// // delete team
// function* deleteTeamSaga(action) {
//     try {
//         let body = JSON.stringify({
//             "id": action.id
//         });
//         const result = yield Api.delTeamAPI(body);
//         yield put({ type: DEL_LEAUGE_SUCCESSFULLY });
//         ToastUtil.showToast(Constants.MESSAGE_DELETE_SUCCESS, 'success')
//         yield put(getlistTeam())
//     } catch (error) {
//         yield put({ type: DEL_LEAUGE_FAILED, error });
//     }
// }

// export function* watchDeleteTeamSaga() {
//     yield takeLatest(IS_DEL_LEAUGE, deleteTeamSaga);
// }
