import { IS_FORGOT_PASS, FORGOT_PASS_SUCCESSFULLY, FORGOT_PASS_FAILED } from '../actions/ActionTypes';

const forgotPassReducers = (state = {}, action) => {
    switch (action.type) {
        case IS_FORGOT_PASS:
            return {
                ...state,
                isLoading: true,
            };
        case FORGOT_PASS_SUCCESSFULLY:
            return {
                ...state,
                isLoading: false,
            };
        case FORGOT_PASS_FAILED:
            return {
                ...state,
                error: action.error,
                isLoading: false,

            };
        default:
            return state;
    }
}

export default forgotPassReducers;

