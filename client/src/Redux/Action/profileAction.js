import { getDataAPI, patchDataAPI, postDataAPI } from 'api/fetchData';
import { GLOBALTYPES, DeleteData } from 'Redux/Action/globalTypes';
import { imageUpload } from 'utils/imageUpload';
import { createNotify, NOTIFY_TYPES, removeNotify } from './notifyAction';

export const PROFILE_TYPES = {
  LOADING: 'LOADING_PROFILE',
  GET_USER: 'GET_PROFILE_USER',
  FOLLOW: 'FOLLOW',
  UNFOLLOW: 'UNFOLLOW',
  GET_ID: 'GET_PROFILE_ID',
  GET_POST: 'GET_PROFILE_POST',
  UPDATE_POST: 'UPDATE_PROFILE_POST',
};

export const getProfileUsers =
  ({ id, auth }) =>
  async (dispatch) => {
    dispatch({ type: PROFILE_TYPES.GET_ID, payload: id });
    // if (users.every((user) => user._id !== id)) {
    try {
      dispatch({ type: PROFILE_TYPES.LOADING, payload: true });
      const res = getDataAPI(`user/${id}`, auth.token);
      const res1 = getDataAPI(`user_posts/${id}`, auth.token);
      const users = await res;
      const posts = await res1;
      dispatch({
        type: PROFILE_TYPES.GET_USER,
        payload: users.data,
      });
      dispatch({
        type: PROFILE_TYPES.GET_POST,
        payload: { ...posts.data, _id: id, page: 2 },
      });
      dispatch({ type: PROFILE_TYPES.LOADING, payload: false });
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
    // }
  };

export const updateProfileUser =
  ({ userData, avatar, background, auth }) =>
  async (dispatch) => {
    if (!userData.fullname)
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: 'Please add your full name',
        },
      });

    if (userData.fullname.length > 20)
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: 'Your full name too long',
        },
      });

    if (userData.story.length > 200)
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: 'Your story too long',
        },
      });

    try {
      let media;
      let media1;
      dispatch({ type: GLOBALTYPES.ALERTPOST, payload: { loadingg: true } });
      if (avatar) media = await imageUpload([avatar]);
      if (background) media1 = await imageUpload([background]);
      const res = await patchDataAPI(
        'user',
        {
          ...userData,
          avatar: avatar ? media[0].url : auth.user.avatar,
          background: background ? media1[0].url : auth.user.background,
        },
        auth.token
      );
      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: {
          ...auth,
          user: {
            ...auth.user,
            ...userData,
            avatar: avatar ? media[0].url : auth.user.avatar,
            background: background ? media1[0].url : auth.user.background,
          },
        },
      });
      dispatch({ type: GLOBALTYPES.ALERTPOST, payload: { loadingg: false } });
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          success: res.data.msg,
        },
      });
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };

export const follow =
  ({ users, user, auth, socket }) =>
  async (dispatch) => {
    let newUser;

    if (users.every((item) => item._id !== user._id)) {
      newUser = { ...user, followers: [...user.followers, auth.user] };
    } else {
      users.forEach((item) => {
        if (item._id === user._id) {
          newUser = { ...item, followers: [...item.followers, auth.user] };
        }
      });
    }

    dispatch({
      type: PROFILE_TYPES.FOLLOW,
      payload: newUser,
    });

    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        ...auth,
        user: { ...auth.user, following: [...auth.user.following, newUser] },
      },
    });

    try {
      const res = await patchDataAPI(`user/${user._id}/follow`, null, auth.token);
      socket.emit('follow', res.data.newUser);

      //notify
      const msg = {
        id: auth.user._id,
        text: 'đã bắt đầu theo dõi bạn',
        recipients: [newUser._id],
        url: `/profile/${auth.user._id}`,
      };

      dispatch(createNotify({ msg, auth, socket }));
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };

export const unFollow =
  ({ users, user, auth, socket }) =>
  async (dispatch) => {
    let newUser;

    if (users.every((item) => item._id !== user._id)) {
      newUser = { ...user, followers: DeleteData(user.followers, auth.user._id) };
    } else {
      users.forEach((item) => {
        if (item._id === user._id) {
          newUser = { ...item, followers: DeleteData(item.followers, auth.user._id) };
        }
      });
    }

    dispatch({
      type: PROFILE_TYPES.UNFOLLOW,
      payload: newUser,
    });

    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        ...auth,
        user: { ...auth.user, following: DeleteData(auth.user.following, newUser._id) },
      },
    });

    try {
      const res = await patchDataAPI(`user/${user._id}/unfollow`, null, auth.token);
      socket.emit('unFollow', res.data.newUser);

      //notify
      const msg = {
        id: auth.user._id,
        text: 'đã bắt đầu theo dõi bạn',
        recipients: [newUser._id],
        url: `/profile/${auth.user._id}`,
      };

      dispatch(removeNotify({ msg, auth, socket }));
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };

export const privateAccount = (auth) => async (dispatch) => {
  dispatch({
    type: GLOBALTYPES.AUTH,
    payload: {
      ...auth,
      user: { ...auth.user, isPrivate: true },
    },
  });
  
  try {
    await patchDataAPI(`/isPrivate/${auth.user._id}`, null, auth.token);
   
  } catch (err) {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } });
  }
}

export const publicAccount = (auth) => async (dispatch) => {
  dispatch({
    type: GLOBALTYPES.AUTH,
    payload: {
      ...auth,
      user: { ...auth.user, isPrivate: false },
    },
  });
  try {
    await patchDataAPI(`/isPublic/${auth.user._id}`, null, auth.token);

  } catch (err) {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } });
  }
}

export const requestFollow =
  ({data, user, auth, socket}) =>
  async (dispatch) => {

    try {
      const res = await postDataAPI(`requestFollow`, data, auth.token);
      // socket.emit('follow', res.data.newUser);

      // //notify
      const msg = {
        id: res.data.id,
        text: 'đã gửi yêu cầu theo dõi bạn',
        recipients: [user._id],
        request: true,
      };

      dispatch(createNotify({ msg, auth, socket }));
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };

  export const acceptFollow = ({id, notifyId, senderId, auth, socket}) => async (dispatch) => {
    const data = {id, notifyId, senderId};
    
    try {
      await postDataAPI(`acceptFollow`, data, auth.token);
      // socket.emit('follow', res.data.newUser);

      // //notify
      const msg = {
        id: auth.user._id,
        text: 'đã chấp nhận yêu cầu theo dõi',
        recipients: [senderId.id],
      };

      dispatch(createNotify({ msg, auth, socket }));
      
      dispatch({type: NOTIFY_TYPES.REMOVE_NOTIFY, payload: {id}})
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };

  export const unAcceptFollow = ({id, notifyId, senderId, auth, socket}) => async (dispatch) => {
    const data = {id, notifyId};
    
    try {
      await postDataAPI(`unAcceptFollow`, data, auth.token);

      dispatch({type: NOTIFY_TYPES.REMOVE_NOTIFY, payload: {id}})
    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };

  export const ChangePassword = ({data, auth}) => async (dispatch) => {
    const newData = {...data, id: auth.user._id};
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
  
      const res = await postDataAPI(`changePassword`, newData, auth.token);
  
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: false } });
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          success: res.data.msg,
        },
      });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: err.response.data.msg,
        },
      });
    }
    
  
  };

  export const cancelRequest =
  ({data, auth}) =>
  async (dispatch) => {

    try {
      await postDataAPI(`cancelRequest`, data, auth.token);

    } catch (error) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: error.response.data.msg },
      });
    }
  };