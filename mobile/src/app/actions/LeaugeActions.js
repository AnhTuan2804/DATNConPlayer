import {
    IS_CREATE_LEAUGE,
    IS_UPDATE_LEAUGE,
    IS_UPDATE_MATCH_OF_LEAUGE,
    IS_REGISTER_LEAGUE,
    IS_REMOVE_TEAM_LEAGUE
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

// register
export const registerLeague = (value) => {
    return {
        type: IS_REGISTER_LEAGUE,
        isLoading: true,
        value,
    };
}

// remove team
export const removeTeamLeague = (value) => {
    return {
        type: IS_REMOVE_TEAM_LEAGUE,
        isLoading: true,
        value,
    };
}
