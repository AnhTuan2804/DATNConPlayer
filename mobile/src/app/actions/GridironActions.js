import { IS_REGISTER, REGISTER_SUCCESSFULLY, REGISTER_FAILED } from './ActionTypes';

export const isregister = (value) => {
    return {
        type: IS_REGISTER,
        isLoading: true,
        value,
    };
}

// getListArea
// getListLever
// getListSize
// getListCareer
// getListTime
// Team: 
// getlistteam__user
// createTeam
// updateTeam
// addMember
// delMember
// delTeam (team lead)
// getdetail

// Gridiron: 
// getList
// getdetail
// create
// update
// del
// createSub
// delSub
// createPriceOnTime