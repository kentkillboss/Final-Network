import { ADMIN_TYPES } from 'Redux/Action/adminAction';
import { EditData } from 'Redux/Action/globalTypes';

const initialState = {
    users: [],
    result: 0,
    loading: false
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADMIN_TYPES.LOADING:
            return {
                ...state,
                loading: action.payload
            };
        case ADMIN_TYPES.GET_ALL_USERS:
            return {
                ...state,
                users: action.payload.users,
                result: action.payload.result,
            };
        case ADMIN_TYPES.ADMIN_UPDATE_USER:
            return {
                ...state,
                users: EditData(state.users, action.payload._id, action.payload),
            };
        default:
            return state;
    }
}

export default adminReducer;