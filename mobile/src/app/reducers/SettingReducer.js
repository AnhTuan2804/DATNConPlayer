import {
    IS_GET_PROFILE,
    GET_PROFILE_SUCCESSFULLY,
    GET_PROFILE_FAILED,
    IS_UPDATE_INFO,
    UPDATE_INFO_SUCCESSFULLY,
    UPDATE_INFO_FAILED,
    IS_CHANGE_PASS,
    CHANGE_PASS_SUCCESSFULLY,
    CHANGE_PASS_FAILED
} from '../actions/ActionTypes';

const settingReducers = (state = {}, action) => {
    switch (action.type) {
        case IS_GET_PROFILE:
            return {
                ...state,
                isLoading: true,
            };
        case GET_PROFILE_SUCCESSFULLY:
            return {
                ...state,
                userData: action.userData,
                isLoading: false,
            };
        case GET_PROFILE_FAILED:
            return {
                ...state,
                error: action.error,
                isLoading: false,
            };
        case IS_UPDATE_INFO:
            return {
                ...state,
                isLoading: true,
            };
        case UPDATE_INFO_SUCCESSFULLY:
            return {
                ...state,
                userData: action.userData,
                isLoading: false,
            };
        case UPDATE_INFO_FAILED:
            return {
                ...state,
                error: action.error,
                isLoading: false,
            };
        case IS_CHANGE_PASS:
            return {
                ...state,
                isLoading: true,
            };
        case CHANGE_PASS_SUCCESSFULLY:
            return {
                ...state,
                isLoading: false,
            };
        case CHANGE_PASS_FAILED:
            return {
                ...state,
                error: action.error,
                isLoading: false,

            };
        default:
            return state;
    }
}

export default settingReducers;

