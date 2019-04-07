import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import loginReducers from './LoginReducer';
import registerReducers from './ForgotPassReducer';
import forgotPassReducers from './ForgotPassReducer';

const combineReducer = combineReducers({
    form: formReducer,
    loginReducer: loginReducers,
    registerReducers: registerReducers,
    forgotPassReducers : forgotPassReducers,
});

export default combineReducer;