import { GLOBALTYPES } from 'Redux/Action/globalTypes';

const initialState = {};

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case GLOBALTYPES.ALERT:
      return action.payload;
    case GLOBALTYPES.ALERTPOST:
      return action.payload;
    default:
      return state;
  }
};

export default alertReducer;
