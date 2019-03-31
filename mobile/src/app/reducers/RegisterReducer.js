import { IS_REGISTER, REGISTER_SUCCESSFULLY, REGISTER_FAILED } from '../actions/ActionTypes';

const registerReducers = (state = {}, action) => {
    switch (action.type) {
        case IS_REGISTER:
            return {
                ...state,
                isLoading: true,
            };
        case REGISTER_SUCCESSFULLY:
            return {
                ...state,
                userData: action.userData,
                isLoading: false,
            };
        case REGISTER_FAILED:
            return {
                ...state,
                error: action.error,
                isLoading: false,

            };
        default:
            return state;
    }
}

export default registerReducers;

