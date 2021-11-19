import {
  Avatar,
  Box,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles,
  Typography,
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import ReplayRoundedIcon from '@material-ui/icons/ReplayRounded';
import FollowBtn from 'Features/Profile/components/FollowBtn';
import React from 'react';
import Particles from 'react-particles-js';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserActions } from 'Redux/Action/suggestionAction';
import particlesConfig from 'utils/paritcleConfig';

const useStyles = makeStyles((theme) => ({
  paper: {},
  container: {
    // paddingTop: theme.spacing(10),
    position: 'sticky',
    top: theme.spacing(8),
    backgroundColor: '#f0f2f5',
    height: 'calc(100vh - 63px)',
    paddingTop: theme.spacing(4),
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    color: '#555',
  },
  listitem: {
    padding: '10px 0',
  },
  reload: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '30px',
  },
  progress: {
    display: 'flex',
    justifyContent: 'center',
    height: '200px',
    alignItems: 'center',
  },
  linkSuggestions: {
    textDecoration: 'none',
    color: 'black',
  },
}));
function RightBar(props) {
  const classes = useStyles();
  const { auth, suggestions, theme } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    // <Paper elevation={1}>
    <Container className={classes.container} style={{ backgroundColor: theme ? '#e7e6e5' : '#f0f2f5' }}>
      {/* <Particles
        params={particlesConfig}
        height="100vh"
        width="30%"
        style={{ position: theme ? 'fixed' : 'fixed', marginLeft: '-110px' }}
      ></Particles> */}
      <Box className={classes.reload}>
        <Typography className={classes.title} gutterBottom>
          Đề xuất người dùng
        </Typography>
        {!suggestions.loading && (
          <IconButton onClick={() => dispatch(getUserActions(auth.token))}>
            <ReplayRoundedIcon />
          </IconButton>
        )}
      </Box>
      {suggestions.loading ? (
        <Box className={classes.progress}>
          <CircularProgress />
        </Box>
      ) : (
        <List>
          {suggestions.users.map((user) => (
            <Link key={user._id} className={classes.linkSuggestions} to={`/profile/${user._id}`}>
              <ListItem style={{ padding: 0 }}>
                <ListItem button className={classes.listitem}>
                  <ListItemAvatar>
                    <Avatar src={user.avatar} style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}></Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={user.username} />
                </ListItem>
                <IconButton size="small" edge="end" style={{ padding: '0px' }}>
                  {auth.user._id !== user._id && <FollowBtn user={user} />}
                </IconButton>
              </ListItem>
            </Link>
          ))}
        </List>
      )}
      <hr></hr>
      <Box style={{ textAlign: 'center' }}>
        <Typography color="textSecondary">DATN</Typography>
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © '}
          <span color="inherit" to="facebook.com">
            Thành - Ân
          </span>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Box>
    </Container>
    // </Paper>
  );
}

export default RightBar;
