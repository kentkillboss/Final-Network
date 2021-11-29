import { GLOBALTYPES } from 'Redux/Action/globalTypes';

const onlineReducer = (state = [], action) => {
  switch (action.type) { 
    case GLOBALTYPES.REQUEST:
      return action.payload.request;
    default:
      return state;
  }
};

export default onlineReducer;
