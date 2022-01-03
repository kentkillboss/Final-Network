import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { cancelRequest, follow, requestFollow, unFollow } from 'Redux/Action/profileAction';

FollowBtn.propTypes = {
  user: PropTypes.object,
};

function FollowBtn({ user }) {
  const [followed, setFollowed] = useState(false);
  const [requestFollows, setRequestFollows] = useState(false);
  const { auth, profile, request, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.user.following.find((item) => item._id === user._id)) {
      setFollowed(true);
    }
    return () => setFollowed(false);
  }, [auth.user.following, user._id]);

  useEffect(() => {
    // if (request.find((item) => item.senderId === auth.user._id) && request.find((item) => item.recipientId === user._id)) {
    //   setRequestFollow(true);
    // }
    request.forEach(item => {
      if(item.senderId === auth.user._id && item.recipientId === user._id){
        setRequestFollows(true);
      }
    });
  }, [request, auth.user, user._id])

  // useEffect(() => {
  //   if (user.isPrivate) {
  //     setRequest(true);
  //   }
  //   return () => setRequest(false);
  // }, [user]);

  const handleFollow = () => {
    if (user.isPrivate) {
      setRequestFollows(true);
      const data = { senderId: auth.user._id, recipientId: user._id };
      dispatch(requestFollow({ data, user, auth, socket }));
    } else {
      setFollowed(true);
      dispatch(
        follow({
          users: profile.users,
          user,
          auth,
          socket,
        })
      );
    }
  };
  const handleUnFollow = () => {
    setFollowed(false);
    dispatch(
      unFollow({
        users: profile.users,
        user,
        auth,
        socket,
      })
    );
  };

  const handleUnRequest = () => {
    setRequestFollows(false);
    const data = { senderId: auth.user._id, recipientId: user._id };
    dispatch(cancelRequest({data, auth}))
  }

  return (
    <>
      {requestFollows ? (
        <Button onClick={handleUnRequest} className="btnEdit" variant="outlined">
          Đã yêu cầu
        </Button>
      ) : followed ? (
        <Button onClick={handleUnFollow} className="btnEdit" variant="outlined">
          Huỷ theo dõi
        </Button>
      ) : (
        <Button onClick={handleFollow} className="btnEdit" variant="outlined">
          Theo dõi
        </Button>
      )}
    </>
  );
}

export default FollowBtn;
