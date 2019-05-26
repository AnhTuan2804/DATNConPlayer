import {
    IS_CREATE_LEAUGE,
    CREATE_LEAUGE_SUCCESSFULLY,
    CREATE_LEAUGE_FAILED,

    IS_UPDATE_LEAUGE,
    UPDATE_LEAUGE_SUCCESSFULLY,
    UPDATE_LEAUGE_FAILED,

    IS_UPDATE_MATCH_OF_LEAUGE,
    UPDATE_MATCH_OF_LEAUGE_SUCCESSFULLY,
    UPDATE_MATCH_OF_LEAUGE_FAILED,

} from '../actions/ActionTypes';

const leaugeReducers = (state = {}, action) => {
    switch (action.type) {
        // createMATCH
        case IS_CREATE_LEAUGE:
            return {
                ...state,
                isLoading: true,
            };
        case CREATE_LEAUGE_SUCCESSFULLY:
            return {
                ...state,
                isLoading: false,
            };
        case CREATE_LEAUGE_FAILED:
            return {
                ...state,
                error: action.error,
                isLoading: false,
            };
        // updateMATCH
        case IS_UPDATE_LEAUGE:
            return {
                ...state,
                isLoading: true,
            };
        case UPDATE_LEAUGE_SUCCESSFULLY:
            return {
                ...state,
                isLoading: false,
            };
        case UPDATE_LEAUGE_FAILED:
            return {
                ...state,
                error: action.error,
                isLoading: false,
            };
        case IS_UPDATE_MATCH_OF_LEAUGE:
            return {
                ...state,
                isLoading: true,
            };
        case UPDATE_MATCH_OF_LEAUGE_SUCCESSFULLY:
            return {
                ...state,
                isLoading: false,
            };
        case UPDATE_MATCH_OF_LEAUGE_FAILED:
            return {
                ...state,
                error: action.error,
                isLoading: false,
            };
        default:
            return state;
    }
}

export default leaugeReducers;