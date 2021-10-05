import { GLOBALTYPES } from 'Redux/Action/globalTypes';

const socketReduce = (state = [], action) => {
  switch (action.type) {
    case GLOBALTYPES.SOCKET:
      return action.payload;
    default:
      return state;
  }
};

export default socketReduce;
