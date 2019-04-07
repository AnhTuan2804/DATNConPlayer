import { IS_FORGOT_PASS, FORGOT_PASS_SUCCESSFULLY, FORGOT_PASS_FAILED  } from '../actions/ActionTypes';
import { Actions } from 'react-native-router-flux';

//Saga effects
import { put, takeLatest } from 'redux-saga/effects';
import { Api } from './Api';
import ToastUtil from '../../theme/shared/utils/ToastUtil';
import Constants from '../../theme/variable/Constants';
import { Toast } from 'native-base';

function* forgotPassSaga(action) {
    try {
        let body = JSON.stringify({
            "email": action.value,
        });
        const forgotPassAPI = yield Api.forgotPassAPI(body);
        yield put({ type: FORGOT_PASS_SUCCESSFULLY });
        ToastUtil.showToast(forgotPassAPI.message, 'success')
        Actions.loginScreen()
    } catch (error) {
        yield put({ type: FORGOT_PASS_FAILED, error });
    }
}

export function* watchForgotPass() {
    yield takeLatest(IS_FORGOT_PASS, forgotPassSaga);
}