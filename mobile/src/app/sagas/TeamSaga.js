import {
    IS_GET_LIST_TEAM,
    GET_LIST_TEAM_SUCCESSFULLY,
    GET_LIST_TEAM_FAILED,

    IS_CREATE_TEAM,
    CREATE_TEAM_SUCCESSFULLY,
    CREATE_TEAM_FAILED,

    IS_UPDATE_TEAM,
    UPDATE_TEAM_SUCCESSFULLY,
    UPDATE_TEAM_FAILED,

    IS_ADD_MEMBER_TEAM,
    ADD_MEMBER_TEAM_SUCCESSFULLY,
    ADD_MEMBER_TEAM_FAILED,

    IS_DEL_MEMBER_TEAM,
    DEL_MEMBER_TEAM_SUCCESSFULLY,
    DEL_MEMBER_TEAM_FAILED,


    IS_DEL_TEAM,
    DEL_TEAM_SUCCESSFULLY,
    DEL_TEAM_FAILED,

    IS_GET_DETAIL_TEAM,
    GET_DETAIL_TEAM_SUCCESSFULLY,
    GET_DETAIL_TEAM_FAILED,
} from '../actions/ActionTypes';

//Saga effects
import { put, takeLatest } from 'redux-saga/effects';
import { Api } from './Api';
import ToastUtil from '../../theme/shared/utils/ToastUtil';
import Constants from '../../theme/variable/Constants';
import { getlistTeam, getdetail } from '../actions/TeamActions';
import { Actions } from 'react-native-router-flux';

// create team
function* createTeamSaga(action) {
    try {
        let body = JSON.stringify({
            "team": {
                "name": action.value.name,
                "age_max": action.value.age_max,
                "age_min": action.value.age_min,
                "level_id": action.value.level_id,
                "area_id": action.value.area_id,
                "picture": action.value.picture,
                "description": action.value.description
            }
        });
        const result = yield Api.createTeamAPI(body);
        yield put({ type: CREATE_TEAM_SUCCESSFULLY });
        ToastUtil.showToast(Constants.MESSAGE_CREATE_SUCCESS, 'success')
        yield put(getlistTeam())
        Actions.Manage()
    } catch (error) {
        yield put({ type: CREATE_TEAM_FAILED, error });
    }
}

export function* watchCreateTeamSaga() {
    yield takeLatest(IS_CREATE_TEAM, createTeamSaga);
}

// update team
function* updateTeamSaga(action) {
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
        yield put({ type: UPDATE_TEAM_SUCCESSFULLY });
        ToastUtil.showToast(Constants.MESSAGE_UPDATE_SUCCESS, 'success')
        // Actions.loginScreen()
    } catch (error) {
        yield put({ type: UPDATE_TEAM_FAILED, error });
    }
}

export function* watchUpdateTeamSaga() {
    yield takeLatest(IS_UPDATE_TEAM, updateTeamSaga);
}

// delete team
function* deleteTeamSaga(action) {
    try {
        let body = JSON.stringify({
            "id": action.id
        });
        const result = yield Api.delTeamAPI(body);
        yield put({ type: DEL_TEAM_SUCCESSFULLY });
        ToastUtil.showToast(Constants.MESSAGE_DELETE_SUCCESS, 'success')
        yield put(getlistTeam())
    } catch (error) {
        yield put({ type: DEL_TEAM_FAILED, error });
    }
}

export function* watchDeleteTeamSaga() {
    yield takeLatest(IS_DEL_TEAM, deleteTeamSaga);
}

// get list team
function* getListTeamSaga(action) {
    try {
        const list = yield Api.getListTeamAPI();
        yield put({ type: GET_LIST_TEAM_SUCCESSFULLY, listTeam: list });
    } catch (error) {
        yield put({ type: GET_LIST_TEAM_FAILED, error });
    }
}

export function* watchGetListTeamSaga() {
    yield takeLatest(IS_GET_LIST_TEAM, getListTeamSaga);
}

// get team detail
function* getTeamDetailSaga(action) {
    try {
        const id = action.id;
        const result = yield Api.getTeamDetailAPI(id);
        yield put({ type: GET_DETAIL_TEAM_SUCCESSFULLY, infoTeam: result });
    } catch (error) {
        yield put({ type: GET_DETAIL_TEAM_FAILED, error });
    }
}

export function* watchGetTeamDetailSaga() {
    yield takeLatest(IS_GET_DETAIL_TEAM, getTeamDetailSaga);
}

// add member
function* addMemberSaga(action) {
    try {
        let body = JSON.stringify({
            "teamUser": {
                "member": action.value.member,
                "team_id": action.value.team_id
            }
        });
        const result = yield Api.addMemberAPI(body);
        yield put({ type: ADD_MEMBER_TEAM_SUCCESSFULLY });
        ToastUtil.showToast(Constants.MESSAGE_CREATE_SUCCESS, 'success')
        yield put(getdetail(action.value.team_id))
        // Actions.loginScreen()
    } catch (error) {
        yield put({ type: ADD_MEMBER_TEAM_FAILED, error });
    }
}

export function* watchAddMemberSaga() {
    yield takeLatest(IS_ADD_MEMBER_TEAM, addMemberSaga);
}

// delete member
function* deleteMemberSaga(action) {
    try {
        let body = JSON.stringify({
            "id": action.value.id
        });
        const result = yield Api.delMemberAPI(body);
        yield put({ type: DEL_MEMBER_TEAM_SUCCESSFULLY });
        ToastUtil.showToast(Constants.MESSAGE_DELETE_SUCCESS, 'success')
        yield put(getdetail(action.value.team_id))
        // Actions.loginScreen()
    } catch (error) {
        yield put({ type: DEL_MEMBER_TEAM_FAILED, error });
    }
}

export function* watchDeleteMemberSaga() {
    yield takeLatest(IS_DEL_MEMBER_TEAM, deleteMemberSaga);
}
