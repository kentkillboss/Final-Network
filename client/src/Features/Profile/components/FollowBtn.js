import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { follow, unFollow } from 'Redux/Action/profileAction';

FollowBtn.propTypes = {
  user: PropTypes.object,
};

function FollowBtn({ user }) {
  const [followed, setFollowed] = useState(false);
  const { auth, profile, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.user.following.find((item) => item._id === user._id)) {
      setFollowed(true);
    }
    return () => setFollowed(false);
  }, [auth.user.following, user._id]);

  const handleFollow = () => {
    setFollowed(true);
    dispatch(
      follow({
        users: profile.users,
        user,
        auth,
        socket,
      })
    );
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

  return (
    <>
      {followed ? (
        <Button onClick={handleUnFollow} className="btnEdit" variant="outlined">
          UnFollow
        </Button>
      ) : (
        <Button onClick={handleFollow} className="btnEdit" variant="outlined">
          Follow
        </Button>
      )}
    </>
  );
}

export default FollowBtn;
