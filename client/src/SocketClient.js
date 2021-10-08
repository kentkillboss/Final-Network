import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { POST_TYPES } from 'Redux/Action/postAction';
import { GLOBALTYPES } from 'Redux/Action/globalTypes';
import { NOTIFY_TYPES } from 'Redux/Action/notifyAction';
import audioNoti from 'audio/notifycation.mp3';

const spawnNotification = (body, icon, url, title) => {
  let options = {
    body,
    icon,
  };
  let n = new Notification(title, options);
  n.onclick = (e) => {
    e.preventDefault();
    window.open(url, '_blank');
  };
};

function SocketClient(props) {
  const { auth, socket, notify } = useSelector((state) => state);
  const dispatch = useDispatch();
  const audioRef = useRef();

  // join user
  useEffect(() => {
    socket.emit('joinUser', auth.user._id);
  }, [socket, auth.user._id]);

  // Likes
  useEffect(() => {
    socket.on('likeToClient', (newPost) => {
      dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    });
    return () => socket.off('likeToClient');
  }, [socket, dispatch]);

  //UnLike
  useEffect(() => {
    socket.on('unLikeToClient', (newPost) => {
      dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    });
    return () => socket.off('unLikeToClient');
  }, [socket, dispatch]);

  // Comment

  useEffect(() => {
    socket.on('createCommentToClient', (newPost) => {
      dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    });
    return () => socket.off('createCommentToClient');
  }, [socket, dispatch]);
  //deleteComment
  useEffect(() => {
    socket.on('deleteCommentToClient', (newPost) => {
      dispatch({ type: POST_TYPES.UPDATE_POST, payload: newPost });
    });
    return () => socket.off('deleteCommentToClient');
  }, [socket, dispatch]);

  //follow
  useEffect(() => {
    socket.on('followToClient', (newUser) => {
      dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: newUser } });
    });
    return () => socket.off('followToClient');
  }, [socket, dispatch, auth]);

  //unfollow
  useEffect(() => {
    socket.on('unFollowToClient', (newUser) => {
      dispatch({ type: GLOBALTYPES.AUTH, payload: { ...auth, user: newUser } });
    });
    return () => socket.off('unFollowToClient');
  }, [socket, dispatch, auth]);

  //notify
  useEffect(() => {
    socket.on('createNotifyToClient', (msg) => {
      dispatch({ type: NOTIFY_TYPES.CREATE_NOTIFY, payload: msg });
      if (notify.sound) audioRef.current.play();
      spawnNotification(msg.user.username + ' ' + msg.text, msg.user.avatar, msg.url, 'TA-NETWORK');
    });
    return () => socket.off('createNotifyToClient');
  }, [socket, dispatch, notify.sound]);

  useEffect(() => {
    socket.on('removeNotifyToClient', (msg) => {
      dispatch({ type: NOTIFY_TYPES.REMOVE_NOTIFY, payload: msg });
    });
    return () => socket.off('removeNotifyToClient');
  }, [socket, dispatch]);

  return (
    <>
      <audio controls ref={audioRef} style={{ display: 'none' }}>
        <source src={audioNoti} type="audio/mp3" />
      </audio>
    </>
  );
}

export default SocketClient;
