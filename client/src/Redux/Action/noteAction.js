import { deleteDataAPI, getDataAPI, patchDataAPI, postDataAPI } from 'api/fetchData';
import { GLOBALTYPES } from './globalTypes';

export const NOTE_TYPES = {
  GET_NOTES: 'GET_NOTES',
  CREATE_NOTE: 'CREATE_NOTE',
  GET_NOTE_ID: 'GET_NOTE_ID',
  UPDATE_NOTE: 'UPDATE_NOTE',
  DELETE_NOTE: 'DELETE_NOTE',
};

export const createNote =
  ({ userData, selectedDate, auth }) =>
  async (dispatch) => {
    try {
      const { title, content, category } = userData;
      dispatch({
        type: GLOBALTYPES.ALERTPOST,
        payload: { loadingg: true },
      });
      const res = await postDataAPI('notes', { title, content, category, selectedDate }, auth.token);
      console.log(res);
      dispatch({ type: NOTE_TYPES.CREATE_NOTE, payload: { ...res.data.newNote, user: auth.user } });
      dispatch({
        type: GLOBALTYPES.ALERTPOST,
        payload: { loadingg: false },
      });
      dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };

export const getNotes = (token) => async (dispatch) => {
  try {
    const res = await getDataAPI('notes', token);
    dispatch({
      type: NOTE_TYPES.GET_NOTES,
      payload: { ...res.data, page: 2 },
    });
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: error.response.data.msg },
    });
  }
};

export const getNoteById = (id, token) => async (dispatch) => {
  try {
    const res = await getDataAPI(`note/${id}`, token);
    console.log(res.data.note);
    dispatch({
      type: NOTE_TYPES.GET_NOTE_ID,
      payload: { ...res.data.note },
    });
  } catch (error) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: error.response.data.msg },
    });
  }
};

export const updateNote =
  ({ id, userData, selectedDate, auth }) =>
  async (dispatch) => {
    try {
      const { title, content, category } = userData;
      const res = await patchDataAPI(`note/${id}`, { title, content, category, selectedDate }, auth.token);
      console.log(res);
      dispatch({
        type: NOTE_TYPES.UPDATE_NOTE,
        payload: res.data.newNote,
      });
      dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };

export const deleteNote =
  ({ id, auth }) =>
  async (dispatch) => {
    dispatch({ type: NOTE_TYPES.DELETE_NOTE, payload: id });
    try {
      const res = await deleteDataAPI(`note/${id}`, auth.token);
      dispatch({
        type: NOTE_TYPES.DELETE_NOTE,
        payload: res.data.newNote,
      });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: 'Faild' },
      });
    }
  };

export const notifiNote =
  ({ item, auth }) =>
  async (dispatch) => {
    try {
      await postDataAPI(`untoggle/${item._id}`);

      const msg = {
        id: item._id,
        text: `Nhắc nhở: ${item.title}`,
        recipients: [auth.user._id],
        url: '/notes',
      };
      await postDataAPI('notifiNote', msg, auth.token);
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: 'Faild' },
      });
    }
  };
