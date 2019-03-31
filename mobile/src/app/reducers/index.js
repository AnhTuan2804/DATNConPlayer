import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import loginReducers from './LoginReducer';
import registerReducers from './RegisterReducer';

const combineReducer = combineReducers({
    form: formReducer,
    loginReducer: loginReducers,
    registerReducers: registerReducers,
});

export default combineReducer;