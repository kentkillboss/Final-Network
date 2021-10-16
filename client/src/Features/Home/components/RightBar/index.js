import {
  Avatar, Box, Container, IconButton, ImageList,
  ImageListItem, Link, List, ListItem,
  ListItemAvatar,
  ListItemText, makeStyles,
  Typography
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import ReplayRoundedIcon from '@material-ui/icons/ReplayRounded';
import FollowBtn from 'Features/Profile/components/FollowBtn';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProfileUsers } from 'Redux/Action/profileAction';
import { getUserActions } from 'Redux/Action/suggestionAction';

const useStyles = makeStyles((theme) => ({
  paper: {
    
  },
  container: {
    paddingTop: theme.spacing(10),
    position: 'sticky',
    top: 0,
    backgroundColor: '#f0f2f5',
    height: '100vh'
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    color: '#555',
  },
  link: {
    marginRight: theme.spacing(2),
    color: '#555',
    fontSize: 16,
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
}));
function RightBar(props) {
  const classes = useStyles();
  const { profile, auth, suggestions } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [gallery, setGallery] = useState([]);

  // {posts.posts.slice(0, 6).map((post) => (
  //   <>
  //     {post.images.slice(0, 6).map((img) => (
  //       <ImageListItem>
  //         <img width="100%" src={img.url} alt="" />
  //       </ImageListItem>
  //     ))}{' '}
  //   </>
  // ))}

  useEffect(() => {
    let id = auth.user._id;
    if (profile.ids.every((item) => item !== id)) {
      dispatch(getProfileUsers({ id, auth }));
    }
  }, [auth.user._id, auth, dispatch, profile.ids]);

  useEffect(() => {
    profile.userPosts.forEach((data) => {
      if (data._id === auth.user._id) {
      }
      setGallery(data.posts);
    });
  }, [profile.userPosts, auth.user._id]);
  return (
    // <Paper elevation={1}>
    <Container className={classes.container}>
      {/* <Typography className={classes.title} gutterBottom>
        Gallery
      </Typography>
      <ImageList rowHeight={100} style={{ marginBottom: 20 }} cols={2}>
      {gallery.slice(0,6).map((post) => (
        <ImageListItem>
          {post.images[0].url.match(/video/i) ?
              <video controls src={post.images[0].url} alt="" />
            : <img src={post.images[0].url} alt="" />
          }
          
        </ImageListItem>
      ))}

      </ImageList> */}
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
            <Link to={`/profile/${user._id}`}>
            <ListItem key={user._id} style={{ padding: 0 }}>
              <ListItem button className={classes.listitem}>
                <ListItemAvatar>
                  <Avatar src={user.avatar}></Avatar>
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
    </Container>
    // </Paper>
  );
}

export default RightBar;
