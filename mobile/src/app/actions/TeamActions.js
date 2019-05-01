import {
    IS_GET_LIST_TEAM,
    IS_CREATE_TEAM,
    IS_UPDATE_TEAM,
    IS_ADD_MEMBER_TEAM,
    IS_DEL_MEMBER_TEAM,
    IS_DEL_TEAM,
    IS_GET_DETAIL_TEAM,
} from './ActionTypes';


// getlistteam
export const getlistTeam = () => {
    return {
        type: IS_GET_LIST_TEAM,
        isLoading: true,
    };
}
// createTeam
export const createTeam = (value) => {
    return {
        type: IS_CREATE_TEAM,
        isLoading: true,
        value
    };
}
// updateTeam
export const updateTeam = (value) => {
    return {
        type: IS_UPDATE_TEAM,
        isLoading: true,
        value
    };
}
// addMember
export const addMember = (value) => {
    return {
        type: IS_ADD_MEMBER_TEAM,
        isLoading: true,
        value
    };
}
// delMember
export const delMember = (value) => {
    return {
        type: IS_DEL_MEMBER_TEAM,
        isLoading: true,
        value
    };
}
// delTeam(team lead)
export const delTeam = (id) => {
    return {
        type: IS_DEL_TEAM,
        isLoading: true,
        id
    };
}
// getdetail
export const getdetail = (id) => {
    return {
        type: IS_GET_DETAIL_TEAM,
        isLoading: true,
        id
    };
}
