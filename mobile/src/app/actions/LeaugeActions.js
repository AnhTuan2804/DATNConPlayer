import {
    IS_CREATE_LEAUGE,
    IS_UPDATE_LEAUGE,
    IS_UPDATE_MATCH_OF_LEAUGE,
} from './ActionTypes';

// createLeauge
export const createLeauge = (value) => {
    return {
        type: IS_CREATE_LEAUGE,
        isLoading: true,
        value
    };
}
// updateLeauge
export const updateLeauge = (value) => {
    return {
        type: IS_UPDATE_LEAUGE,
        isLoading: true,
        value,
    };
}

export const updateMatchOfLeauge = (value) => {
    return {
        type: IS_UPDATE_MATCH_OF_LEAUGE,
        isLoading: true,
        value,
    };
}
