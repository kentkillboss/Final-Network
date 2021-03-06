import { Box } from '@material-ui/core';
import Loader from 'Components/Loading/LoadingPost';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getProfileUsers } from 'Redux/Action/profileAction';
import ProfileInfo from './components/ProfileInfo';

function Profile(props) {
  const { profile, auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (profile.ids.every((item) => item !== id)) {
      dispatch(getProfileUsers({ id, auth }));
    }
  }, [id, auth, dispatch, profile.ids]);

  return (
    <>
      {profile.loading ? (
        // <img src={LoadingIcon} alt="loading" />
        <Loader />
      ) : (
        <Box style={{ paddingTop: '20px' }}>
          <ProfileInfo auth={auth} profile={profile} dispatch={dispatch} id={id} />
        </Box>
      )}
    </>
  );
}

export default Profile;
