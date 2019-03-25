import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import loginReducers from './LoginReducer';
// import transactionHistoryReducers from './TransactionHistoryReducer';
// import depositCalculationReducers from './DepositCalculationReducer';
// import forgotPasswordReducers from './ForgotPasswordReducers';
// import forgotUserIDReducers from './ForgotUserIDReducers';
// import paymentReducers from './PaymentReducer';
// import withdrawReducers from './WithdrawReducer';
// import WithdrawHistoryReducer from './WithdrawHistoryReducer';
// import exchangeMoneyReducers from './ExchangeMoneyReducer';
// import homeReducers from './HomeReducer';
// import detailItemReducers from './DetailItemReducer';
// import detailBankReducers from './DetailBankReducer';
// import showInfoWithdrawReducers from './ShowInfoWithdrawReducer';
// import showInfoExchangeMoneyReducers from './ShowInfoExchangeMoneyReducer';
// import authenticationReducers from './AuthenticationReducer';
// import authenticationSMSReducers from './AuthenticationSMSReducer';

const combineReducer = combineReducers({
    form: formReducer,
    loginReducer: loginReducers,
    // forgotPasswordReducer: forgotPasswordReducers,
    // forgotUserIDReducer: forgotUserIDReducers,
    // transactionHistoryReducers: transactionHistoryReducers,
    // depositCalculationReducers: depositCalculationReducers,
    // paymentReducer: paymentReducers,
    // withdrawReducer: withdrawReducers,
    // WithdrawHistoryReducer: WithdrawHistoryReducer,
    // exchangeMoneyReducer: exchangeMoneyReducers,
    // homeReducer: homeReducers,
    // detailItemReducer: detailItemReducers,
    // detailBankReducer: detailBankReducers,
    // showInfoWithdrawReducer: showInfoWithdrawReducers,
    // showInfoExchangeMoneyReducer: showInfoExchangeMoneyReducers,
    // authenticationReducer: authenticationReducers,
    // authenticationSMSReducer: authenticationSMSReducers,
});

export default combineReducer;