import { EditData, GLOBALTYPES } from 'Redux/Action/globalTypes';

const initialState = {
  token: '',
  user: [],
  followingSug: [],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case GLOBALTYPES.AUTH:
      return {
        token: action.payload.token,
        user: action.payload.user,
        followingSug: action.payload.followingSug,
      };
    case GLOBALTYPES.CHECK_ON_OFF:
      return {
        ...state,
        followingSug: state.followingSug.map((user) =>
          action.payload.includes(user._id) ? { ...user, online: true } : { ...user, online: false }
        ),
      };
    case GLOBALTYPES.UPDATE_USER:
      return {
        ...state,
        user: EditData(state.user, action.payload._id, action.payload),
      };
    default:
      return state;
  }
};

export default authReducer;
