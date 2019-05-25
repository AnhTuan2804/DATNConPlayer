import { IS_LOGIN, LOGIN_SUCCESSFULLY, LOGIN_FAILED } from '../actions/ActionTypes';
import { Actions } from 'react-native-router-flux';

//Saga effects
import { put, takeLatest } from 'redux-saga/effects';
import { Api } from './Api';
import ToastUtil from '../../theme/shared/utils/ToastUtil';
import Constants from '../../theme/variable/Constants';
import { AsyncStorage } from 'react-native';
import LoginService from '../../theme/shared/utils/LoginService';

function* loginSaga(action) {
    try {
        let auth = `${action.email}:${action.password}`
        const userDataAPI = yield Api.loginAPI(auth);
        Constants.EMAIL_ADDRESS = userDataAPI.email
        Constants.TOKEN = userDataAPI.token
        Constants.USER_ID = userDataAPI.id
        Constants.PHONE = userDataAPI.phone
        yield put({ type: LOGIN_SUCCESSFULLY });
        if (userDataAPI) {
            LoginService.storeToken(userDataAPI.token)
            Actions.TOP()
        }
    } catch (error) {
        yield put({ type: LOGIN_FAILED, error });
    }
}

export function* watchLogin() {
    yield takeLatest(IS_LOGIN, loginSaga);
}