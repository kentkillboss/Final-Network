import { GLOBALTYPES } from 'Redux/Action/globalTypes';

const themeReducer = (state = null, action) => {
  switch (action.type) {
    case GLOBALTYPES.PEER:
      return action.payload;
    default:
      return state;
  }
};

export default themeReducer;
