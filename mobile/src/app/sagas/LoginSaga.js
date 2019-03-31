import { IS_LOGIN, LOGIN_SUCCESSFULLY, LOGIN_FAILED } from '../actions/ActionTypes';
import { Actions } from 'react-native-router-flux';

//Saga effects
import { put, takeLatest } from 'redux-saga/effects';
import { Api } from './Api';
import ToastUtil from '../../theme/shared/utils/ToastUtil';
import Constants from '../../theme/variable/Constants';
import { AsyncStorage } from 'react-native';

async function storeToken(token) {
    try {
        await AsyncStorage.setItem('token', token);
        console.log('store token success');

    } catch (error) {
        // Error saving data
        console.log('Error saving data');
    }
};

function* loginSaga(action) {
    try {
        let body = JSON.stringify({
            "password": action.password,
            "email": action.email,
        });

        let auth = `${action.email}:${action.password}`
        const userDataAPI = yield Api.loginAPI(body);
        console.log("aaaaaaaaaaaaaaaaaaa", userDataAPI);
        Constants.EMAIL_ADDRESS = userDataAPI.email
        Constants.TOKEN = userDataAPI.token
        Constants.USER_ID = userDataAPI.id
        Constants.PHONE = userDataAPI.phone
        yield put({ type: LOGIN_SUCCESSFULLY });
        if (userDataAPI) {
            storeToken(userDataAPI.token)
            Actions.TOP()
        }
    } catch (error) {
        yield put({ type: LOGIN_FAILED, error });
    }
}

export function* watchLogin() {
    yield takeLatest(IS_LOGIN, loginSaga);
}