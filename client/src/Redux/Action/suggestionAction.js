import { getDataAPI } from 'api/fetchData';
import { GLOBALTYPES } from 'Redux/Action/globalTypes';

export const SUGGES_TYPES = {
  LOADING: 'LOADING_SUGGES',
  GET_USERS: 'GET_USERS_SUGGES',
};

export const getUserActions = (token) => async (dispatch) => {
  try {
    dispatch({ type: SUGGES_TYPES.LOADING, payload: true });
    const res = await getDataAPI('suggestionUser', token);

    dispatch({ type: SUGGES_TYPES.GET_USERS, payload: res.data });

    dispatch({ type: SUGGES_TYPES.LOADING, payload: false });
  } catch (error) {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error.response.data.msg } });
  }
};
