import { IS_REGISTER, REGISTER_SUCCESSFULLY, REGISTER_FAILED } from './ActionTypes';

export const isregister = (value) => {
    return {
        type: IS_REGISTER,
        isLoading: true,
        value,
    };
}

export const registerSuccess = () => {
    return {
        type: REGISTER_SUCCESSFULLY,
        userData,
        isLoading: false,
    };
}

export const registerFailed = (error) => {
    return {
        type: REGISTER_FAILED,
        error,
        isLoading: false,
    };
}
