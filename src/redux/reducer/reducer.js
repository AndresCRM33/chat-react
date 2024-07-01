import { SET_USER_NAME, LOG_OUT } from "../actions/actions";

const initialState = {
    userName: ""
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_NAME:
            return {
                ...state,
                userName: action.payload
            };
        case LOG_OUT:
            return {
                ...state,
                userName: ""
            };
        default:
            return state;
    }
};


export default rootReducer;