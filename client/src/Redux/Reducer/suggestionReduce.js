import { SUGGES_TYPES } from 'Redux/Action/suggestionAction';
import {} from 'Redux/Reducer/suggestionReduce';

const initialState = {
  loading: false,
  users: [],
};

const suggestionReduce = (state = initialState, action) => {
  switch (action.type) {
    case SUGGES_TYPES.LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SUGGES_TYPES.GET_USERS:
      return {
        ...state,
        users: action.payload.users,
      };

    default:
      return state;
  }
};

export default suggestionReduce;
