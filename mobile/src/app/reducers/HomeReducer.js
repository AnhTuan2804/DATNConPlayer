import {
    IS_GET_LIST_AREA,
    GET_LIST_AREA_SUCCESSFULLY,
    GET_LIST_AREA_FAILED,

    // getListLever
    IS_GET_LIST_LEVEL,
    GET_LIST_LEVEL_SUCCESSFULLY,
    GET_LIST_LEVEL_FAILED,

    // getListSize
    IS_GET_LIST_SIZE,
    GET_LIST_SIZE_SUCCESSFULLY,
    GET_LIST_SIZE_FAILED,

    // getListCareer
    IS_GET_LIST_CAREER,
    GET_LIST_CAREER_SUCCESSFULLY,
    GET_LIST_CAREER_FAILED,

    // getListTime
    IS_GET_LIST_TIME,
    GET_LIST_TIME_SUCCESSFULLY,
    GET_LIST_TIME_FAILED,
} from '../actions/ActionTypes';

const homeReducers = (state = {}, action) => {
    switch (action.type) {
        // getListArea
        case IS_GET_LIST_AREA:
            return {
                ...state,
                isLoading: true,
            };
        case GET_LIST_AREA_SUCCESSFULLY:
            return {
                ...state,
                listArea: action.listArea,
                isLoading: false,
            };
        case GET_LIST_AREA_FAILED:
            return {
                ...state,
                error: action.error,
                isLoading: false,

            };
        // getListLever
        case IS_GET_LIST_LEVEL:
            return {
                ...state,
                isLoading: true,
            };
        case GET_LIST_LEVEL_SUCCESSFULLY:
            return {
                ...state,
                listLevel: action.listLevel,
                isLoading: false,
            };
        case GET_LIST_LEVEL_FAILED:
            return {
                ...state,
                error: action.error,
                isLoading: false,
            };
        // getListSize
        case IS_GET_LIST_SIZE:
            return {
                ...state,
                isLoading: true,
            };
        case GET_LIST_SIZE_SUCCESSFULLY:
            return {
                ...state,
                listSize: action.listSize,
                isLoading: false,
            };
        case GET_LIST_SIZE_FAILED:
            return {
                ...state,
                error: action.error,
                isLoading: false,
            };
        // getListCareer
        case IS_GET_LIST_CAREER:
            return {
                ...state,
                isLoading: true,
            };
        case GET_LIST_CAREER_SUCCESSFULLY:
            return {
                ...state,
                listCareer: action.listCareer,
                isLoading: false,
            };
        case GET_LIST_CAREER_FAILED:
            return {
                ...state,
                error: action.error,
                isLoading: false,
            };
        // getListTime
        case IS_GET_LIST_TIME:
            return {
                ...state,
                isLoading: true,
            };
        case GET_LIST_TIME_SUCCESSFULLY:
            return {
                ...state,
                listTime: action.listTime,
                isLoading: false,
            };
        case GET_LIST_TIME_FAILED:
            return {
                ...state,
                error: action.error,
                isLoading: false,
            };
        default:
            return state;
    }
}

export default homeReducers;

