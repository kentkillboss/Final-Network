import { Box } from '@material-ui/core';
import LoadingIcon from 'images/load.gif';
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
 
        <Box style={{ paddingTop: '80px' }}>
          {profile.loading ? (
            <img src={LoadingIcon} alt="loading" />
          ) : (
            <ProfileInfo auth={auth} profile={profile} dispatch={dispatch} id={id} />
          )}
        </Box>
        
    // <Box style={{ paddingTop: '80px' }}>
    //   {profile.loading ? (
    //     <img src={LoadingIcon} alt="loading" />
    //   ) : (
    //     <ProfileInfo auth={auth} profile={profile} dispatch={dispatch} id={id} />
    //   )}
    // </Box>
  );
}

export default Profile;
