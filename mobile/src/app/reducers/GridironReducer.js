import {
    // getList
    IS_GET_LIST_GRIDIRON,
    GET_LIST_GRIDIRON_SUCCESSFULLY,
    GET_LIST_GRIDIRON_FAILED,

    // getdetail
    IS_GET_DETALI_GRIDIRON,
    GET_DETALI_GRIDIRON_SUCCESSFULLY,
    GET_DETALI_GRIDIRON_FAILED,

    // create
    IS_CREATE_GRIDIRON,
    CREATE_GRIDIRON_SUCCESSFULLY,
    CREATE_GRIDIRON_FAILED,

    // update
    IS_UPDATE_GRIDIRON,
    UPDATE_GRIDIRON_SUCCESSFULLY,
    UPDATE_GRIDIRON_FAILED,

    // del
    IS_DEL_GRIDIRON,
    DEL_GRIDIRON_SUCCESSFULLY,
    DEL_GRIDIRON_FAILED,

    // createSub
    IS_CREATE_SUB_GRIDIRON,
    CREATE_SUB_GRIDIRON_SUCCESSFULLY,
    CREATE_SUB_GRIDIRON_FAILED,

    // delSub
    IS_DEL_SUB_GRIDIRON,
    DEL_SUB_GRIDIRON_SUCCESSFULLY,
    DEL_SUB_GRIDIRON_FAILED,

    // createPriceOnTime
    IS_CREATE_PRICE_ON_TIME,
    CREATE_PRICE_ON_TIME_SUCCESSFULLY,
    CREATE_PRICE_ON_TIME_FAILED,

    // delPriceOnTime
    IS_DEL_PRICE_ON_TIME,
    DEL_PRICE_ON_TIME_SUCCESSFULLY,
    DEL_PRICE_ON_TIME_FAILED,
} from '../actions/ActionTypes';

const gridironReducers = (state = {}, action) => {
    switch (action.type) {
        // getListGridiron
        case IS_GET_LIST_GRIDIRON:
            return {
                ...state,
                isLoading: true,
            };
        case GET_LIST_GRIDIRON_SUCCESSFULLY:
            return {
                ...state,
                listGridiron: action.listGridiron,
                isLoading: false,
            };
        case GET_LIST_GRIDIRON_FAILED:
            return {
                ...state,
                error: action.error,
                isLoading: false,
            };
        // getDetailGridiron
        case IS_GET_DETALI_GRIDIRON:
            return {
                ...state,
                isLoading: true,
            };
        case GET_DETALI_GRIDIRON_SUCCESSFULLY:
            return {
                ...state,
                infoGridiron: action.infoGridiron,
                isLoading: false,
            };
        case GET_DETALI_GRIDIRON_FAILED:
            return {
                ...state,
                error: action.error,
                isLoading: false,
            };
        // createGridiron
        case IS_CREATE_GRIDIRON:
            return {
                ...state,
                isLoading: true,
            };
        case CREATE_GRIDIRON_SUCCESSFULLY:
            return {
                ...state,
                isLoading: false,
            };
        case CREATE_GRIDIRON_FAILED:
            return {
                ...state,
                error: action.error,
                isLoading: false,
            };
        // updateGridiron
        case IS_UPDATE_GRIDIRON:
            return {
                ...state,
                isLoading: true,
            };
        case UPDATE_GRIDIRON_SUCCESSFULLY:
            return {
                ...state,
                isLoading: false,
            };
        case UPDATE_GRIDIRON_FAILED:
            return {
                ...state,
                error: action.error,
                isLoading: false,
            };
        // delGridiron
        case IS_DEL_GRIDIRON:
            return {
                ...state,
                isLoading: true,
            };
        case DEL_GRIDIRON_SUCCESSFULLY:
            return {
                ...state,
                isLoading: false,
            };
        case DEL_GRIDIRON_FAILED:
            return {
                ...state,
                error: action.error,
                isLoading: false,
            };
        // createSubGridiron
        case IS_CREATE_SUB_GRIDIRON:
            return {
                ...state,
                isLoading: true,
            };
        case CREATE_SUB_GRIDIRON_SUCCESSFULLY:
            return {
                ...state,
                isLoading: false,
            };
        case CREATE_SUB_GRIDIRON_FAILED:
            return {
                ...state,
                error: action.error,
                isLoading: false,
            };
        // delSubGridiron
        case IS_DEL_SUB_GRIDIRON:
            return {
                ...state,
                isLoading: true,
            };
        case DEL_SUB_GRIDIRON_SUCCESSFULLY:
            return {
                ...state,
                isLoading: false,
            };
        case DEL_SUB_GRIDIRON_FAILED:
            return {
                ...state,
                error: action.error,
                isLoading: false,
            };
        // createPriceOnTime
        case IS_CREATE_PRICE_ON_TIME:
            return {
                ...state,
                isLoading: true,
            };
        case CREATE_PRICE_ON_TIME_SUCCESSFULLY:
            return {
                ...state,
                isLoading: false,
            };
        case CREATE_PRICE_ON_TIME_FAILED:
            return {
                ...state,
                error: action.error,
                isLoading: false,
            };
        // delPriceOnTime
        case IS_DEL_PRICE_ON_TIME:
            return {
                ...state,
                isLoading: true,
            };
        case DEL_PRICE_ON_TIME_SUCCESSFULLY:
            return {
                ...state,
                isLoading: false,
            };
        case DEL_PRICE_ON_TIME_FAILED:
            return {
                ...state,
                error: action.error,
                isLoading: false,
            };
        default:
            return state;
    }
}

export default gridironReducers;

