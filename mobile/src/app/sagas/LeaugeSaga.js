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

    IS_UPDATE_MATCH_OF_LEAUGE,
    UPDATE_MATCH_OF_LEAUGE_SUCCESSFULLY,
    UPDATE_MATCH_OF_LEAUGE_FAILED,

    IS_REGISTER_LEAGUE,
    REGISTER_LEAGUE_SUCCESSFULLY,
    REGISTER_LEAGUE_FAILED,

    IS_REMOVE_TEAM_LEAGUE,
    REMOVE_TEAM_LEAGUE_SUCCESSFULLY,
    REMOVE_TEAM_LEAGUE_FAILED

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

// League: update
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

// League: register
function* registerLeagueSaga(action) {
    try {
        let body = JSON.stringify(action.value);
        const result = yield Api.registerLeagueAPI(body);
        yield put({ type: REGISTER_LEAGUE_SUCCESSFULLY });
        ToastUtil.showToast(Constants.MESSAGE_UPDATE_SUCCESS, 'success')
    } catch (error) {
        yield put({ type: REGISTER_LEAGUE_FAILED, error });
    }
}

export function* watchregisterLeagueSaga() {
    yield takeLatest(IS_REGISTER_LEAGUE, registerLeagueSaga);
}

// League: remove team
function* removeTeamLeagueSaga(action) {
    try {
        let body = JSON.stringify(action.value);
        const result = yield Api.removeTeamLeagueAPI(body);
        yield put({ type: REMOVE_TEAM_LEAGUE_SUCCESSFULLY });
        ToastUtil.showToast(Constants.MESSAGE_UPDATE_SUCCESS, 'success')
    } catch (error) {
        yield put({ type: REMOVE_TEAM_LEAGUE_FAILED, error });
    }
}

export function* watchRemoveTeamLeagueSaga() {
    yield takeLatest(IS_REMOVE_TEAM_LEAGUE, removeTeamLeagueSaga);
}

function* updateMatchLeaugeSaga(action) {
    try {
        let body = JSON.stringify(action.value);
        console.log("bodySaga", body);
        const result = yield Api.updateMatchOfLeaugeAPI(body);
        yield put({ type: UPDATE_MATCH_OF_LEAUGE_SUCCESSFULLY });
        ToastUtil.showToast(Constants.MESSAGE_UPDATE_SUCCESS, 'success')
    } catch (error) {
        yield put({ type: UPDATE_MATCH_OF_LEAUGE_FAILED, error });
    }
}

export function* watchUpdateMatchOfLeaugeSaga() {
    yield takeLatest(IS_UPDATE_MATCH_OF_LEAUGE, updateMatchLeaugeSaga);
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
