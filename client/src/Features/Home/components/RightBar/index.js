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
} from '@material-ui/core';
import { AvatarGroup } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(10),
    position: 'sticky',
    top: 0,
    backgroundColor: '#f0f2f5',
  },
  title: {
    fontSize: 16,
    fontWeight: 500,
    color: '#555',
  },
  link: {
    marginRight: theme.spacing(2),
    color: '#555',
    fontSize: 16,
  },
}));
function RightBar(props) {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      {/* <Typography className={classes.title} gutterBottom>
        Online Friends
      </Typography>
      <AvatarGroup max={6} style={{ marginBottom: 20 }}>
        <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
        <Avatar alt="Travis Howard" src="https://material-ui.com/static/images/avatar/2.jpg" />
        <Avatar alt="Cindy Baker" src="https://material-ui.com/static/images/avatar/3.jpg" />
        <Avatar alt="Agnes Walker" src="" />
        <Avatar alt="Trevor Henderson" src="https://material-ui.com/static/images/avatar/6.jpg" />
        <Avatar alt="Trevor Henderson" src="https://material-ui.com/static/images/avatar/7.jpg" />
        <Avatar alt="Trevor Henderson" src="https://material-ui.com/static/images/avatar/8.jpg" />
      </AvatarGroup> */}
      <Typography className={classes.title} gutterBottom>
        Gallery
      </Typography>
      <ImageList rowHeight={100} style={{ marginBottom: 20 }} cols={2}>
        <ImageListItem>
          <img src="https://bloganh.net/wp-content/uploads/2021/03/chup-anh-dep-anh-sang-min.jpg" alt="" />
        </ImageListItem>
        <ImageListItem>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOmxvEQSFOasI9s2K8LjlMjhARYvUiMDdS4ta7KQ4LzPHIPL5BP-dbm0bzrweAfoe1fwk&usqp=CAU"
            alt=""
          />
        </ImageListItem>
        <ImageListItem>
          <img src="https://bloganh.net/wp-content/uploads/2021/03/chup-anh-dep-anh-sang-min.jpg" alt="" />
        </ImageListItem>
        <ImageListItem>
          <img src="https://bloganh.net/wp-content/uploads/2021/03/chup-anh-dep-anh-sang-min.jpg" alt="" />
        </ImageListItem>
        <ImageListItem>
          <img src="https://bloganh.net/wp-content/uploads/2021/03/chup-anh-dep-anh-sang-min.jpg" alt="" />
        </ImageListItem>
        <ImageListItem>
          <img src="https://bloganh.net/wp-content/uploads/2021/03/chup-anh-dep-anh-sang-min.jpg" alt="" />
        </ImageListItem>
      </ImageList>
      <Typography className={classes.title} gutterBottom>
        Suggestions
      </Typography>
      <List>
        {/* {users.map((user) => ( */}
        <ListItem>
          <ListItem button className={classes.listitem}>
            <ListItemAvatar>
              <Avatar src=""></Avatar>
            </ListItemAvatar>
            <ListItemText primary="aaaa" />
          </ListItem>
          <IconButton size="large" edge="end" style={{ padding: '0px' }}>
            {/* {auth.user._id !== user._id && <FollowBtn user={user} />} */}
          </IconButton>
        </ListItem>
        {/* ))} */}
      </List>
    </Container>
  );
}

export default RightBar;
