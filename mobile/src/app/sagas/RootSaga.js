//Saga effects
import { fork, all } from 'redux-saga/effects';
// import { watchLogin } from './LoginSaga';
// import { watchGetListHistorySuccess, watchGetListHistoryUnSuccess } from './TransactionHistorySaga';
// import { watchResultCalculation, watchGetRate, watchGetBalance, watchCreateAddress } from './DepositCalculationSaga';
// import { watchForgotPassword, watchChangePassword } from './ForgotPassSagas';
// import { watchForgotUserID } from './ForgotUserIDSagas';
// import { watchGetBalancePayment, watchGetRatePayment } from './PaymentSaga';
// import { watchGetListAddressWithdraw } from './WithdrawSaga';
// import { watchGetListHistoryBTC, watchGetListHistoryJPY } from './WithdrawHistorySaga';
// import { watchGetListAddressBank } from './ExchangeMoneySaga';
// import { watchGetBalanceHome, watchGetRateHome, watchGetBalanceIntervalHome } from './HomeSaga';
// import { watchGetFeeDetailItem } from './DetailItemSaga';
// import { watchGetFeeDetailBank, watchGetRateDetailBank } from './DetailBankSaga';
// import { watchSendWithdrawBTC } from './ShowInfoWithdrawSaga';
// import { watchSendWithdrawJPY } from './ShowInfoExchangeMoneySaga';
// import { watchVerifyAuthentication } from './AuthenticationSaga';
// import { watchSendAuthenticationSMS, watchVerifyAuthenticationSMS } from './AuthenticationSMSSaga';

export default function* rootSaga() {
    yield all([
        // fork(watchLogin),
        // fork(watchGetListHistorySuccess),
        // fork(watchGetListHistoryUnSuccess),
        // fork(watchResultCalculation),
        // fork(watchGetRate),
        // fork(watchGetBalance),
        // fork(watchCreateAddress),
        // fork(watchForgotPassword),
        // fork(watchChangePassword),
        // fork(watchForgotUserID),
        // fork(watchGetBalancePayment),
        // fork(watchGetRatePayment),
        // fork(watchGetListAddressWithdraw),
        // fork(watchGetListHistoryBTC),
        // fork(watchGetListHistoryJPY),
        // fork(watchGetListAddressBank),
        // fork(watchGetBalanceHome),
        // fork(watchGetRateHome),
        // fork(watchGetFeeDetailItem),
        // fork(watchGetFeeDetailBank),
        // fork(watchGetRateDetailBank),
        // fork(watchSendWithdrawBTC),
        // fork(watchSendWithdrawJPY),
        // fork(watchVerifyAuthentication),
        // fork(watchSendAuthenticationSMS),
        // fork(watchVerifyAuthenticationSMS),
        // fork(watchGetBalanceIntervalHome),
    ]);
}