import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import loginReducers from './LoginReducer';
import registerReducers from './ForgotPassReducer';
import forgotPassReducers from './ForgotPassReducer';
import settingReducers from './SettingReducer';
import homeReducers from './HomeReducer';

const combineReducer = combineReducers({
    form: formReducer,
    loginReducer: loginReducers,
    registerReducers: registerReducers,
    forgotPassReducers : forgotPassReducers,
    settingReducers: settingReducers,
    homeReducers: homeReducers,
});

export default combineReducer;