import {
    IS_UPDATE_INFO,
    UPDATE_INFO_SUCCESSFULLY,
    UPDATE_INFO_FAILED,
    IS_CHANGE_PASS,
    CHANGE_PASS_SUCCESSFULLY,
    CHANGE_PASS_FAILED
} from './ActionTypes';

export const isupdateInfo = (value) => {
    return {
        type: IS_UPDATE_INFO,
        isLoading: true,
        value,
    };
}

export const updateInfoSuccess = () => {
    return {
        type: UPDATE_INFO_SUCCESSFULLY,
        // userData,
        isLoading: false,
    };
}

export const updateInfoFailed = (error) => {
    return {
        type: UPDATE_INFO_FAILED,
        error,
        isLoading: false,
    };
}


export const ischangePass = (value) => {
    return {
        type: IS_CHANGE_PASS,
        isLoading: true,
        value,
    };
}

export const changePassSuccess = () => {
    return {
        type: CHANGE_PASS_SUCCESSFULLY,
        // userData,
        isLoading: false,
    };
}

export const changePassFailed = (error) => {
    return {
        type: CHANGE_PASS_FAILED,
        error,
        isLoading: false,
    };
}
