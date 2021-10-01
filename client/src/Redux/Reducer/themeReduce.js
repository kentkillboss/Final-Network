import { GLOBALTYPES } from 'Redux/Action/globalTypes';

const initialState = false;

const themeReduce = (state = initialState, action) => {
  switch (action.type) {
    case GLOBALTYPES.THEME:
      return action.payload;
    default:
      return state;
  }
};

export default themeReduce;
