import { getDataAPI } from "api/fetchData";
import { GLOBALTYPES } from "./globalTypes";

export const ADMIN_TYPES = {
    LOADING: 'LOADING_ADMIN',
    GET_ALL_USERS: 'GET_ALL_USERS'
  };

export const getUsers = (auth) => async (dispatch) => {
    try {
        dispatch({type: ADMIN_TYPES.LOADING, payload: true});

        const res = await getDataAPI('users', auth.token);
        dispatch({type: ADMIN_TYPES.GET_ALL_USERS, payload: res.data});

        dispatch({type: ADMIN_TYPES.LOADING, payload: false});
    } catch (error) {
        dispatch({
            type: GLOBALTYPES.ALERT,
            payload: { error: error.response.data.msg },
          });
    }
}