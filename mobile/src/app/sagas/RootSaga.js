//Saga effects
import { fork, all } from 'redux-saga/effects';
import { watchLogin } from './LoginSaga';
import { watchRegister } from './RegisterSaga';
import { watchForgotPass } from './ForgotPassSaga';
import { watchUpdateInfo, watchchangePass } from './SettingSaga';
import { watchGetListLevelSaga, watchGetListArea, watchGetListTimeSaga, watchGetListSizeSaga, watchGetListCareerSaga } from './HomeSaga';
import { watchGetListTeamSaga, watchCreateTeamSaga, watchUpdateTeamSaga, watchDeleteTeamSaga, watchGetTeamDetailSaga, watchAddMemberSaga, watchDeleteMemberSaga } from './TeamSaga';
import { watchGetListGridironSaga, watchGetGridironDetailSaga, watchCreateGridironSaga, watchUpdateGridironSaga, watchAddSubGridironSaga, watchDeleteSubGridironSaga, watchAddPriceOnTimeSaga, watchDeletePriceOnTimeSaga } from './GridironSaga';

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
        fork(watchGetListCareerSaga),
        fork(watchGetListTeamSaga),
        fork(watchCreateTeamSaga),
        fork(watchUpdateTeamSaga),
        fork(watchDeleteTeamSaga),
        fork(watchGetTeamDetailSaga),
        fork(watchAddMemberSaga),
        fork(watchDeleteMemberSaga),
        fork(watchGetListGridironSaga),
        fork(watchGetGridironDetailSaga),
        fork(watchCreateGridironSaga),
        fork(watchUpdateGridironSaga),
        fork(watchUpdateGridironSaga),
        fork(watchAddSubGridironSaga),
        fork(watchDeleteSubGridironSaga),
        fork(watchAddPriceOnTimeSaga),
        fork(watchDeletePriceOnTimeSaga),
    ]);
}