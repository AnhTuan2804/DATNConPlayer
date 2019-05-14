import {
    IS_GET_LIST_AREA,
    IS_GET_LIST_LEVEL,
    IS_GET_LIST_SIZE,
    IS_GET_LIST_CAREER,
    IS_GET_LIST_TIME,
    IS_GET_LIST_ALL_GRIDIRON,
} from './ActionTypes';

export const getAllListGridiron = () => {
    return {
        type: IS_GET_LIST_ALL_GRIDIRON,
        isLoading: true,
    };
}

// getListArea
export const getListArea = () => {
    return {
        type: IS_GET_LIST_AREA,
        isLoading: true,
    };
}
// getListLever
export const getListLever = () => {
    return {
        type: IS_GET_LIST_LEVEL,
        isLoading: true,
    };
}
// getListSize
export const getListSize = () => {
    return {
        type: IS_GET_LIST_SIZE,
        isLoading: true,
    };
}
// getListCareer
export const getListCareer = () => {
    return {
        type: IS_GET_LIST_CAREER,
        isLoading: true,
    };
}
// getListTime
export const getListTime = () => {
    return {
        type: IS_GET_LIST_TIME,
        isLoading: true,
    };
}