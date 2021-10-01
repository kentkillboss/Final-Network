import { makeStyles } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { Close } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import FollowBtn from './FollowBtn';

Following.propTypes = {
  users: PropTypes.array,
};
const useStyles = makeStyles((theme) => ({
  close: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    zIndex: 1,
  },
  listitem: {
    padding: 0,
    margin: 0,
  },
}));
function Following({ users, setShowFollowing }) {
  const classes = useStyles();
  const { auth } = useSelector((state) => state);
  const history = useHistory();
  const handleClose = () => {
    setShowFollowing(false);
  };
  const handleClick = (id) => {
    history.push(`/profile/${id}`);
    setShowFollowing(false);
  };
  return (
    <div>
      <Dialog open={setShowFollowing} onClose={handleClose} fullWidth maxWidth="xs">
        <IconButton onClick={handleClose} className={classes.close}>
          <Close />
        </IconButton>
        <DialogTitle id="alert-dialog-title">Followers &nbsp;&nbsp;&nbsp;&nbsp;</DialogTitle>
        <DialogContent>
          <List>
            {users.map((user) => (
              <ListItem key={user._id}>
                <ListItem button className={classes.listitem} onClick={() => handleClick(user._id)}>
                  <ListItemAvatar>
                    <Avatar src={user.avatar}></Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={user.fullname} />
                </ListItem>
                <IconButton size="large" edge="end" style={{ padding: '0px' }}>
                  {auth.user._id !== user._id && <FollowBtn user={user} />}
                </IconButton>
              </ListItem>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Following;
