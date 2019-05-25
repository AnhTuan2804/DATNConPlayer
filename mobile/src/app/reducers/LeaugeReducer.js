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

    IS_REMOVE_TEAM_LEAGUE,
    REMOVE_TEAM_LEAGUE_SUCCESSFULLY,
    REMOVE_TEAM_LEAGUE_FAILED,

    IS_REGISTER_LEAGUE,
    REGISTER_LEAGUE_SUCCESSFULLY,
    REGISTER_LEAGUE_FAILED

} from '../actions/ActionTypes';

const leaugeReducers = (state = {}, action) => {
    switch (action.type) {
        // create league
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

        // update league
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

        // remove team
        case IS_REMOVE_TEAM_LEAGUE:
            return {
                ...state,
                isLoading: true,
            };
        case REMOVE_TEAM_LEAGUE_SUCCESSFULLY:
            return {
                ...state,
                isLoading: false,
            };
        case REMOVE_TEAM_LEAGUE_FAILED:
            return {
                ...state,
                error: action.error,
                isLoading: false,
            };

        // register 
        case IS_REGISTER_LEAGUE:
            return {
                ...state,
                isLoading: true,
            };
        case REGISTER_LEAGUE_SUCCESSFULLY:
            return {
                ...state,
                isLoading: false,
            };
        case REGISTER_LEAGUE_FAILED:
            return {
                ...state,
                error: action.error,
                isLoading: false,
            };

        //update match of league
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