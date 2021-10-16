import { Box, Button, Card, CardHeader, Divider, Grid, Link, makeStyles, Typography } from '@material-ui/core';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import EmailIcon from '@material-ui/icons/Email';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import WcIcon from '@material-ui/icons/Wc';
import React, { useEffect, useState } from 'react';
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
    color: '#5C8D89',
    margin: '10px',
    borderRight: '0.5px solid grey',
    cursor: 'pointer',
    '&:hover': {
      color: 'black',
    },
  },
  box3: {
    color: '#5C8D89',
    margin: '10px',
    textAlign: 'center',
    cursor: 'pointer',
    '&:hover': {
      color: 'black',
    },
  },
  cover: {
    width: '100%',
    height: '310px',
  },
  info: {
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing(6),
    },
  }
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
            <Box className="user_profile_cap">
              <Box className="user_profile_cover">
                <img
                  src={user.background}
                  alt="img"
                />
              </Box>
              <Box className="user_profile_headline">
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
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={4} className={classes.info}>
            <Box spacing={3}>
              {/* <ProfileFollowInfo profile={myProfile} /> */}
              <Card sx={{ py: 3 }} className={classes.card}>
                <Box direction="row" className={classes.box1} divider={<Divider orientation="vertical" flexItem />}>
                  <Box width={1} className={classes.box2} textAlign="center" onClick={() => setShowFollowers(true)}>
                    <Typography variant="h4">{user.followers.length}</Typography>
                    <Typography variant="body2">Người theo dõi</Typography>
                  </Box>

                  <Box width={1} onClick={() => setShowFollowing(true)} className={classes.box3}>
                    <Typography variant="h4">{user.following.length}</Typography>
                    <Typography variant="body2">Đang theo dõi</Typography>
                  </Box>
                </Box>
              </Card>

              <Card className={classes.card}>
                <CardHeader title="Giới thiệu" />
                <Box padding="0 13px 13px 13px">
                  <Typography color="textSecondary" align="center">
                    {user.story}
                  </Typography>
                </Box>
              </Card>

              <Card className={classes.card}>
                <CardHeader title="Thông tin" />

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
                    <EmailIcon className={classes.icon} />
                    <Typography variant="body2">
                      Hòm thư : &nbsp;
                      <Link component="span" variant="subtitle2" color="primary">
                        {user.email}
                      </Link>
                    </Typography>
                  </Box>

                  <Box direction="row" display="flex" marginBottom={1}>
                    <LocationOnIcon className={classes.icon} />
                    <Typography variant="body2">
                      Địa chỉ: &nbsp;
                      <Link component="span" variant="subtitle2" color="primary">
                        {user.address ? user.address : 'Add infomation'}
                      </Link>
                    </Typography>
                  </Box>

                  <Box direction="row" display="flex" marginBottom={1}>
                    <WcIcon className={classes.icon} />
                    <Typography variant="body2">
                      Giới tính: &nbsp;
                      <Link component="span" variant="subtitle2" color="primary">
                        {user.gender}
                      </Link>
                    </Typography>
                  </Box>
                </Box>
              </Card>

              {/* <ProfileSocialInfo profile={myProfile} /> */}
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
