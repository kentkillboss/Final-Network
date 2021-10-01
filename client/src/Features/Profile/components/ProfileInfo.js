import { Box, Button, Card, CardHeader, Divider, Grid, Link, makeStyles, Typography } from '@material-ui/core';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import EditProfile from './EditProfileForm/EditProfileForm';
import FollowBtn from './FollowBtn';
import Followers from './Followers';
import Following from './Following';
import './profile.css';
import ProfilePost from './ProfilePost';

ProfileInfo.propTypes = {};
const useStyles = makeStyles((theme) => ({
  icon: {
    width: 20,
    height: 20,
    marginTop: 1,
    flexShrink: 0,
    marginRight: theme.spacing(2),
  },
  card: {
    backgroundColor: '#f7f7f7',
  },
  avatar: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    textAlign: 'center',
  },
  box1: {
    display: 'flex',
  },
  box2: {
    margin: '10px',
    borderRight: '0.5px solid grey',
  },
  cover: {
    width: '100%',
    height: '232px',
  },
}));

function ProfileInfo({ id, auth, profile, dispatch }) {
  const classes = useStyles();

  const [userData, setUserData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  useEffect(() => {
    if (id === auth.user._id) {
      setUserData([auth.user]);
    } else {
      const newData = profile.users.filter((user) => user._id === id);
      setUserData(newData);
    }
  }, [id, auth, dispatch, profile.users]);
  const SOCIALS = [
    {
      name: 'Website',
      icon: <AcUnitIcon className={classes.icon} />,
      href: 'facebook.com/kentkillboss',
      website: userData.website,
    },
    {
      name: 'Twitter',
      icon: <AcUnitIcon className={classes.icon} />,
      href: '/',
    },
    {
      name: 'Instagram',
      icon: <AcUnitIcon className={classes.icon} />,
      href: '/',
    },
    {
      name: 'Facebook',
      icon: <AcUnitIcon className={classes.icon} />,
      href: '/',
    },
  ];

  return (
    <Box>
      {userData.map((user) => (
        <Grid key={user._id} container spacing={0}>
          <Grid item xs={12} className={classes.cover}>
            <div className="user_profile_cap">
              <div className="user_profile_cover">
                <img
                  src="http://1.bp.blogspot.com/_Ym3du2sG3R4/S_-M_kTV9OI/AAAAAAAACZA/SNCea2qKOWQ/s1600/mac+os+x+wallpaper.jpg"
                  alt="img"
                />
              </div>
              <div className="user_profile_headline">
                <img src={user.avatar} alt="img" />
                <h2>{user.username}</h2>
                <span>{user.fullname}</span>

                {user._id === auth.user._id ? (
                  <Button onClick={() => setEdit(true)} className="btnEdit">
                    Edit
                  </Button>
                ) : (
                  <FollowBtn user={user} />
                )}
              </div>
            </div>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box spacing={3}>
              {/* <ProfileFollowInfo profile={myProfile} /> */}
              <Card sx={{ py: 3 }} className={classes.card}>
                <Box direction="row" className={classes.box1} divider={<Divider orientation="vertical" flexItem />}>
                  <Box width={1} className={classes.box2} textAlign="center" onClick={() => setShowFollowers(true)}>
                    <Typography variant="h4">{user.followers.length}</Typography>
                    <Typography variant="body2">Follower</Typography>
                  </Box>

                  <Box width={1} margin="10px" textAlign="center" onClick={() => setShowFollowing(true)}>
                    <Typography variant="h4">{user.following.length}</Typography>
                    <Typography variant="body2">Following</Typography>
                  </Box>
                </Box>
              </Card>

              <Card className={classes.card}>
                <CardHeader title="About" />

                <Box padding="13px">
                  <Box direction="row" display="flex" marginBottom={1}>
                    <AcUnitIcon className={classes.icon} />
                    <Typography variant="body2">
                      FullName : &nbsp;
                      <Link component="span" variant="subtitle2" color="primary">
                        {user.fullname}
                      </Link>
                    </Typography>
                  </Box>

                  <Box direction="row" display="flex" marginBottom={1}>
                    <AcUnitIcon className={classes.icon} />
                    <Typography variant="body2">
                      UserName : &nbsp;
                      <Link component="span" variant="subtitle2" color="primary">
                        {user.username}
                      </Link>
                    </Typography>
                  </Box>

                  <Box direction="row" display="flex" marginBottom={1}>
                    <AcUnitIcon className={classes.icon} />
                    <Typography variant="body2">
                      Email : &nbsp;
                      <Link component="span" variant="subtitle2" color="primary">
                        {user.email}
                      </Link>
                    </Typography>
                  </Box>

                  <Box direction="row" display="flex" marginBottom={1}>
                    <AcUnitIcon className={classes.icon} />
                    <Typography variant="body2">
                      Address: &nbsp;
                      <Link component="span" variant="subtitle2" color="primary">
                        {user.address ? user.address : 'Add infomation'}
                      </Link>
                    </Typography>
                  </Box>

                  <Box direction="row" display="flex" marginBottom={1}>
                    <AcUnitIcon className={classes.icon} />
                    <Typography variant="body2">
                      Gender: &nbsp;
                      <Link component="span" variant="subtitle2" color="primary">
                        {user.gender}
                      </Link>
                    </Typography>
                  </Box>
                </Box>
              </Card>

              {/* <ProfileSocialInfo profile={myProfile} /> */}
              <Card className={classes.card}>
                <CardHeader title="Social" />
                <Box padding="13px">
                  {SOCIALS.map((link, index) => (
                    <Box key={index} direction="row" display="flex" marginBottom={1}>
                      {link.icon} &nbsp;
                      <Typography variant="body2">
                        <Link component="span" variant="subtitle2" color="primary">
                          {link.name}
                        </Link>
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Card>
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            <Box spacing={3} style={{ margin: '40px' }}>
              <ProfilePost auth={auth} profile={profile} dispatch={dispatch} id={id} />
            </Box>
          </Grid>

          {edit && <EditProfile setEdit={setEdit} />}
          {showFollowers && <Followers users={user.followers} setShowFollowers={setShowFollowers} />}
          {showFollowing && <Following users={user.following} setShowFollowing={setShowFollowing} />}
        </Grid>
      ))}
    </Box>
  );
}

export default ProfileInfo;
