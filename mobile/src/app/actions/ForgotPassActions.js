import { IS_FORGOT_PASS, FORGOT_PASS_SUCCESSFULLY, FORGOT_PASS_FAILED } from './ActionTypes';

export const isforgotPass = (value) => {
    return {
        type: IS_FORGOT_PASS,
        isLoading: true,
        value,
    };
}

export const forgotPassSuccess = () => {
    return {
        type: FORGOT_PASS_SUCCESSFULLY,
        isLoading: false,
    };
}

export const forgotPassFailed = (error) => {
    return {
        type: FORGOT_PASS_FAILED,
        error,
        isLoading: false,
    };
}
