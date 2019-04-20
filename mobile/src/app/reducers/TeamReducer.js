import {
    IS_GET_LIST_TEAM,
    GET_LIST_TEAM_SUCCESSFULLY,
    GET_LIST_TEAM_FAILED,

    IS_CREATE_TEAM,
    CREATE_TEAM_SUCCESSFULLY,
    CREATE_TEAM_FAILED,

    IS_UPDATE_TEAM,
    UPDATE_TEAM_SUCCESSFULLY,
    UPDATE_TEAM_FAILED,

    IS_ADD_MEMBER_TEAM,
    ADD_MEMBER_TEAM_SUCCESSFULLY,
    ADD_MEMBER_TEAM_FAILED,

    IS_DEL_MEMBER_TEAM,
    DEL_MEMBER_TEAM_SUCCESSFULLY,
    DEL_MEMBER_TEAM_FAILED,


    IS_DEL_TEAM,
    DEL_TEAM_SUCCESSFULLY,
    DEL_TEAM_FAILED,

    IS_GET_DETAIL_TEAM,
    GET_DETAIL_TEAM_SUCCESSFULLY,
    GET_DETAIL_TEAM_FAILED
} from '../actions/ActionTypes';

const teamReducers = (state = {}, action) => {
    switch (action.type) {
        // getlistteam
        case IS_GET_LIST_TEAM:
            return {
                ...state,
                isLoading: true,
            };
        case GET_LIST_TEAM_SUCCESSFULLY:
            return {
                ...state,
                listTeam: action.listTeam,
                isLoading: false,
            };
        case GET_LIST_TEAM_FAILED:
            return {
                ...state,
                error: action.error,
                isLoading: false,
            };
        // createTeam
        case IS_CREATE_TEAM:
            return {
                ...state,
                isLoading: true,
            };
        case CREATE_TEAM_SUCCESSFULLY:
            return {
                ...state,
                isLoading: false,
            };
        case CREATE_TEAM_FAILED:
            return {
                ...state,
                error: action.error,
                isLoading: false,
            };
        // updateTeam
        case IS_UPDATE_TEAM:
            return {
                ...state,
                isLoading: true,
            };
        case UPDATE_TEAM_SUCCESSFULLY:
            return {
                ...state,
                isLoading: false,
            };
        case UPDATE_TEAM_FAILED:
            return {
                ...state,
                error: action.error,
                isLoading: false,
            };
        // addMember
        case IS_ADD_MEMBER_TEAM:
            return {
                ...state,
                isLoading: true,
            };
        case ADD_MEMBER_TEAM_SUCCESSFULLY:
            return {
                ...state,
                isLoading: false,
            };
        case ADD_MEMBER_TEAM_FAILED:
            return {
                ...state,
                error: action.error,
                isLoading: false,
            };
        // delMember
        case IS_DEL_MEMBER_TEAM:
            return {
                ...state,
                isLoading: true,
            };
        case DEL_MEMBER_TEAM_SUCCESSFULLY:
            return {
                ...state,
                isLoading: false,
            };
        case DEL_MEMBER_TEAM_FAILED:
            return {
                ...state,
                error: action.error,
                isLoading: false,
            };
        // delTeam (team lead)
        case IS_DEL_TEAM:
            return {
                ...state,
                isLoading: true,
            };
        case DEL_TEAM_SUCCESSFULLY:
            return {
                ...state,
                isLoading: false,
            };
        case DEL_TEAM_FAILED:
            return {
                ...state,
                error: action.error,
                isLoading: false,
            };
        // getdetail
        case IS_GET_DETAIL_TEAM:
            return {
                ...state,
                isLoading: true,
            };
        case GET_DETAIL_TEAM_SUCCESSFULLY:
            return {
                ...state,
                infoTeam: action.infoTeam,
                isLoading: false,
            };
        case GET_DETAIL_TEAM_FAILED:
            return {
                ...state,
                error: action.error,
                isLoading: false,
            };
        default:
            return state;
    }
}

export default teamReducers;