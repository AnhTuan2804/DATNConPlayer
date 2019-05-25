import {
    IS_CREATE_MATCH,
    IS_UPDATE_MATCH,
    IS_CANCLE_MATCH,
} from './ActionTypes';

// createMatch
export const createMatch = (value) => {
    return {
        type: IS_CREATE_MATCH,
        isLoading: true,
        value
    };
}
// updateMatch
export const updateMatch = (value) => {
    return {
        type: IS_UPDATE_MATCH,
        isLoading: true,
        value,
        isManage
    };
}

