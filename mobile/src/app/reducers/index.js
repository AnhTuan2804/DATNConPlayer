import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import loginReducers from './LoginReducer';
import registerReducers from './ForgotPassReducer';
import forgotPassReducers from './ForgotPassReducer';
import settingReducers from './SettingReducer';
import homeReducers from './HomeReducer';
import gridironReducers from './GridironReducer';
import teamReducers from './TeamReducer';
import matchReducers from './MatchReducer';
import leaugeReducers from './LeaugeReducer';

const combineReducer = combineReducers({
    form: formReducer,
    loginReducer: loginReducers,
    registerReducers: registerReducers,
    forgotPassReducers: forgotPassReducers,
    settingReducers: settingReducers,
    homeReducers: homeReducers,
    gridironReducers: gridironReducers,
    teamReducers: teamReducers,
    matchReducers: matchReducers,
    leagueReducers: leaugeReducers,
});

export default combineReducer;