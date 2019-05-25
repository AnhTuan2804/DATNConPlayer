import {
    IS_GET_LIST_GRIDIRON,
    IS_GET_DETAIL_GRIDIRON,
    IS_CREATE_GRIDIRON,
    IS_UPDATE_GRIDIRON,
    IS_DEL_GRIDIRON,
    IS_CREATE_SUB_GRIDIRON,
    IS_DEL_SUB_GRIDIRON,
    IS_CREATE_PRICE_ON_TIME,
    IS_DEL_PRICE_ON_TIME,
} from './ActionTypes';

// getListGridiron
export const getListGridiron = () => {
    return {
        type: IS_GET_LIST_GRIDIRON,
        isLoading: true,
    };
}
// getDetailGridiron
export const getDetailGridiron = (id) => {
    return {
        type: IS_GET_DETAIL_GRIDIRON,
        isLoading: true,
        id
    };
}
// createGridiron
export const createGridiron = (value) => {
    return {
        type: IS_CREATE_GRIDIRON,
        isLoading: true,
        value
    };
}
// updateGridiron
export const updateGridiron = (value) => {
    return {
        type: IS_UPDATE_GRIDIRON,
        isLoading: true,
        value
    };
}
// delGridiron
export const delGridiron = (id) => {
    return {
        type: IS_DEL_GRIDIRON,
        isLoading: true,
        id
    };
}
// createSubGridiron
export const createSubGridiron = (value) => {
    return {
        type: IS_CREATE_SUB_GRIDIRON,
        isLoading: true,
        value
    };
}
// delSubGridiron
export const delSubGridiron = (value) => {
    return {
        type: IS_DEL_SUB_GRIDIRON,
        isLoading: true,
        value
    };
}
// createPriceOnTime
export const createPriceOnTime = (value) => {
    return {
        type: IS_CREATE_PRICE_ON_TIME,
        isLoading: true,
        value
    };
}
// delPriceOnTime
export const delPriceOnTime = (value) => {
    return {
        type: IS_DEL_PRICE_ON_TIME,
        isLoading: true,
        value
    };
}