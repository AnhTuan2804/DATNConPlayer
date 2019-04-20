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
        // getListLever
        // getListSize
        // getListCareer
        // getListTime
        // case IS_REGISTER:
        //     return {
        //         ...state,
        //         isLoading: true,
        //     };
        // case REGISTER_SUCCESSFULLY:
        //     return {
        //         ...state,
        //         userData: action.userData,
        //         isLoading: false,
        //     };
        // case REGISTER_FAILED:
        //     return {
        //         ...state,
        //         error: action.error,
        //         isLoading: false,

        //     };
        default:
            return state;
    }
}

export default homeReducers;

