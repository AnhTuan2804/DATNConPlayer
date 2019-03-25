import { IS_LOGIN, LOGIN_SUCCESSFULLY, LOGIN_FAILED } from '../actions/ActionTypes';
import { Actions } from 'react-native-router-flux';

//Saga effects
import { put, takeLatest } from 'redux-saga/effects';
import { Api } from './Api';
import ToastUtil from '../../theme/shared/utils/ToastUtil';
import Constants from '../../theme/variable/Constants';

function* loginSaga(action) {
    try {
        let body = JSON.stringify({
            "password": action.password,
            "email": action.email,
        });
        const userDataAPI = yield Api.loginAPI(body);
        console.log( "aaaaaaaaaaaaaaaaaaa",userDataAPI);
        if(userDataAPI){
            Actions.TOP()
        }
    } catch (error) {
        yield put({ type: LOGIN_FAILED, error });
    }
}

export function* watchLogin() {
    yield takeLatest(IS_LOGIN, loginSaga);
}