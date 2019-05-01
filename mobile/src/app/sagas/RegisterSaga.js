import { IS_REGISTER, REGISTER_SUCCESSFULLY, REGISTER_FAILED } from '../actions/ActionTypes';
import { Actions } from 'react-native-router-flux';

//Saga effects
import { put, takeLatest } from 'redux-saga/effects';
import { Api } from './Api';
import ToastUtil from '../../theme/shared/utils/ToastUtil';
import Constants from '../../theme/variable/Constants';

function* registerSaga(action) {
    try {
        let body = JSON.stringify({
            "phone": action.value.phone,
            "fullname": action.value.fullname,
        });
        let auth = `${action.value.email}:${action.value.password}`
        const userDataAPI = yield Api.registerAPI(auth, body);
        yield put({ type: REGISTER_SUCCESSFULLY });
        Actions.loginScreen()
    } catch (error) {
        yield put({ type: REGISTER_FAILED, error });
    }
}

export function* watchRegister() {
    yield takeLatest(IS_REGISTER, registerSaga);
}