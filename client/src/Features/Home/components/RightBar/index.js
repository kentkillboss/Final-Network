import React from 'react';
import {
  Link,
  Avatar,
  Container,
  ImageList,
  ImageListItem,
  makeStyles,
  Typography,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  List,
  Box,
} from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import LoadIcon from 'images/load.gif';
import FollowBtn from 'Features/Profile/components/FollowBtn';
import ReplayRoundedIcon from '@material-ui/icons/ReplayRounded';
import { getUserActions } from 'Redux/Action/suggestionAction';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
    position: 'sticky',
    top: 0,
    backgroundColor: '#f0f2f5',
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
  const { posts, auth, suggestions } = useSelector((state) => state);
  const dispatch = useDispatch();

  // {posts.posts.slice(0, 6).map((post) => (
  //   <>
  //     {post.images.slice(0, 6).map((img) => (
  //       <ImageListItem>
  //         <img width="100%" src={img.url} alt="" />
  //       </ImageListItem>
  //     ))}{' '}
  //   </>
  // ))}

  return (
    <Container className={classes.container}>
      <Typography className={classes.title} gutterBottom>
        Gallery
      </Typography>
      <ImageList rowHeight={100} style={{ marginBottom: 20 }} cols={2}>
        <ImageListItem>
          <img
            src="https://res.cloudinary.com/dp5ku4grg/image/upload/v1633782629/da-tn/vhalfrtbd3a8vbsn1fmc.png"
            alt=""
          />
        </ImageListItem>
      </ImageList>
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
          ))}
        </List>
      )}
    </Container>
  );
}

export default RightBar;
