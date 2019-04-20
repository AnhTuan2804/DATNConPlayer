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

import { Actions } from 'react-native-router-flux';
//Saga effects
import { put, takeLatest } from 'redux-saga/effects';
import { Api } from './Api';
import ToastUtil from '../../theme/shared/utils/ToastUtil';
import Constants from '../../theme/variable/Constants';
import { Toast } from 'native-base';

// getListArea
function* createTeamSaga(action) {
    try {
        let body = JSON.stringify({
            // tuy bien theo api
            // "phone": action.value.phone,
            // "fullname": action.value.fullname,
        });
        const listAreaAPI = yield Api.createTeamAPI();
        yield put({ type: GET_LIST_AREA_SUCCESSFULLY });
        // ToastUtil.showToast(forgotPassAPI.message, 'success')
        // Actions.loginScreen()
    } catch (error) {
        yield put({ type: GET_LIST_AREA_FAILED, error });
    }
}

export function* watchGetListArea() {
    yield takeLatest(IS_GET_LIST_AREA, createTeamSaga);
}
