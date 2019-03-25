import { IS_LOGIN, LOGIN_SUCCESSFULLY, LOGIN_FAILED, LOGIN_LOGOUT } from '../actions/ActionTypes';

const loginReducers = (state = {}, action) => {
    switch (action.type) {
        case IS_LOGIN:
            return {
                ...state,
                isLoading: true,
            };
        case LOGIN_SUCCESSFULLY:
            return {
                ...state,
                userData: action.userData,
                isLoading: false,
            };
        case LOGIN_FAILED:
            return {
                ...state,
                error: action.error,
                isLoading: false,

            };
        case LOGIN_LOGOUT:
            return {
                ...state,
                reset: true,
            };
        default:
            return state;
    }
}

export default loginReducers;

