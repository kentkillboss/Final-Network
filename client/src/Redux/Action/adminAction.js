import { getDataAPI, patchDataAPI } from 'api/fetchData';
import { GLOBALTYPES } from './globalTypes';

export const ADMIN_TYPES = {
  LOADING: 'LOADING_ADMIN',
  GET_ALL_USERS: 'GET_ALL_USERS',
  ADMIN_UPDATE_USER: 'ADMIN_UPDATE_USER',
};

export const getUsers = (auth) => async (dispatch) => {
  try {
    dispatch({ type: ADMIN_TYPES.LOADING, payload: true });

    const res = await getDataAPI('users', auth.token);
    dispatch({ type: ADMIN_TYPES.GET_ALL_USERS, payload: res.data });

    dispatch({ type: ADMIN_TYPES.LOADING, payload: false });
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: error.response.data.msg },
    });
  }
};

export const isBanUser = ({ user, auth }) => 
async (dispatch) => {
  dispatch({ type: ADMIN_TYPES.ADMIN_UPDATE_USER, payload: { ...user, isBan: true } });
  try {
    await patchDataAPI(`/isBan/${user._id}`, null, auth.token);
  } catch (err) {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } });
  }
};

export const isUnBanUser =
  ({ user, auth }) =>
  async (dispatch) => {
    dispatch({ type: ADMIN_TYPES.ADMIN_UPDATE_USER, payload: { ...user, isBan: false } });
    try {
      await patchDataAPI(`/isUnBan/${user._id}`, null, auth.token);
    } catch (err) {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } });
    }
  };
