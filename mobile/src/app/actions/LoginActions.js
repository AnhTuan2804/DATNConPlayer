import { IS_LOGIN, LOGIN_SUCCESSFULLY, LOGIN_FAILED, LOGIN_LOGOUT } from './ActionTypes';

export const islogin = (email, password) => {
    return {
        type: IS_LOGIN,
        isLoading: true,
        email,
        password,
    };
}

export const loginSuccess = () => {
    return {
        type: LOGIN_SUCCESSFULLY,
        userData,
        isLoading: false,
    };
}

export const loginFailed = (error) => {
    return {
        type: LOGIN_FAILED,
        error,
        isLoading: false,
    };
}
export function logout() {
    return {
        type: LOGIN_LOGOUT,
        reset: true,
    };
}