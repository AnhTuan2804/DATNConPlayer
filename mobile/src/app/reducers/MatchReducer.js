import {
    IS_CREATE_MATCH,
    CREATE_MATCH_SUCCESSFULLY,
    CREATE_MATCH_FAILED,

    IS_UPDATE_MATCH,
    UPDATE_MATCH_SUCCESSFULLY,
    UPDATE_MATCH_FAILED,


    IS_CANCLE_MATCH,
    CANCLE_MATCH_SUCCESSFULLY,
    CANCLE_MATCH_FAILED,

} from '../actions/ActionTypes';

const matchReducers = (state = {}, action) => {
    switch (action.type) {
        // createMATCH
        case IS_CREATE_MATCH:
            return {
                ...state,
                isLoading: true,
            };
        case CREATE_MATCH_SUCCESSFULLY:
            return {
                ...state,
                isLoading: false,
            };
        case CREATE_MATCH_FAILED:
            return {
                ...state,
                error: action.error,
                isLoading: false,
            };
        // updateMATCH
        case IS_UPDATE_MATCH:
            return {
                ...state,
                isLoading: true,
            };
        case UPDATE_MATCH_SUCCESSFULLY:
            return {
                ...state,
                isLoading: false,
            };
        case UPDATE_MATCH_FAILED:
            return {
                ...state,
                error: action.error,
                isLoading: false,
            };
        // CANCLEMATCH (MATCH lead)
        case IS_CANCLE_MATCH:
            return {
                ...state,
                isLoading: true,
            };
        case CANCLE_MATCH_SUCCESSFULLY:
            return {
                ...state,
                isLoading: false,
            };
        case CANCLE_MATCH_FAILED:
            return {
                ...state,
                error: action.error,
                isLoading: false,
            };
        default:
            return state;
    }
}

export default matchReducers;