//Saga effects
import { fork, all } from 'redux-saga/effects';
import { watchLogin } from './LoginSaga';
import { watchRegister } from './RegisterSaga';
import { watchForgotPass } from './ForgotPassSaga';
import { watchUpdateInfo, watchchangePass } from './SettingSaga';
import { watchGetListLevelSaga, watchGetListArea, watchGetListTimeSaga, watchGetListSizeSaga, watchGetListCareerSaga } from './HomeSaga';

export default function* rootSaga() {
    yield all([
        fork(watchLogin),
        fork(watchRegister),
        fork(watchForgotPass),
        fork(watchUpdateInfo),
        fork(watchchangePass),
        fork(watchGetListLevelSaga),
        fork(watchGetListArea),
        fork(watchGetListTimeSaga),
        fork(watchGetListSizeSaga),
        fork(watchGetListCareerSaga)
    ]);
}