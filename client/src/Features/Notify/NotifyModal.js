import { Box, Button, IconButton, makeStyles, Menu, MenuItem, Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import FiberManualRecordRoundedIcon from '@material-ui/icons/FiberManualRecordRounded';
import NotificationsOffRoundedIcon from '@material-ui/icons/NotificationsOffRounded';
import NotificationsRoundedIcon from '@material-ui/icons/NotificationsRounded';
import ImageNotify from 'images/notify.png';
import moment from 'moment';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteAllNotifies, isReadNotify, NOTIFY_TYPES } from 'Redux/Action/notifyAction';
import { acceptFollow } from 'Redux/Action/profileAction';

NotifyModal.propTypes = {};
const useStyles = makeStyles((theme) => ({
  title: {
    borderBottom: '1px solid #f0f2f5',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '-10px',
  },
  titlee: {
    borderTop: '1px solid #f0f2f5',
    textAlign: 'center',
    marginTop: '10px',
  },
  popoverPaper: {
    width: '35%',
    // height: '100%',
    maxHeight: '500px',
    maxWidth: 'unset',
    [theme.breakpoints.down('sm')]: {
      width: '80%',
    },
  },
  pc: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      width: '100%',
      display: 'block',
    },
  },
  mobie: {
    display: 'block',
    [theme.breakpoints.up('sm')]: {
      width: '80%',
      display: 'none',
    },
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  smallmobie: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));
function NotifyModal({ setShowMenu }) {
  const classes = useStyles();
  const dispatch = useDispatch((state) => state);
  const { auth, notify, socket } = useSelector((state) => state);

  const handleClose = () => {
    setShowMenu(false);
  };
  const handleIsRead = (msg) => {
    dispatch(isReadNotify({ msg, auth }));
    setShowMenu(false);
  };
  const handleSound = () => {
    dispatch({ type: NOTIFY_TYPES.UPDATE_SOUND, payload: !notify.sound });
  };
  const handleDeleteNotify = () => {
    const newArr = notify.data.filter((item) => item.isRead === false);
    if (newArr.length === 0) return dispatch(deleteAllNotifies(auth.token));
    if (window.confirm(`Bạn có ${newArr.length} thông báo chưa xem. Bạn có chắc chắn muốn xóa tất cả?`)) {
      return dispatch(deleteAllNotifies(auth.token));
    }
  };

  const handleAccept = (id, notifyId, senderId) => {
    dispatch(acceptFollow({id, notifyId, senderId, auth, socket}));
  }

  return (
    <div>
      <Menu
        PopoverClasses={{ paper: classes.popoverPaper }}
        style={{ top: '45px', right: '0px' }}
        id="simple-menu"
        // anchorEl={anchorEl}
        keepMounted
        open={setShowMenu}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        getContentAnchorEl={null}
      >
        <Box className={classes.title}>
          <Typography style={{ fontWeight: 'bold', fontSize: '18px', marginLeft: '5px' }}>Thông báo</Typography>
          {notify.sound ? (
            <IconButton onClick={handleSound}>
              {' '}
              <NotificationsRoundedIcon />{' '}
            </IconButton>
          ) : (
            <IconButton onClick={handleSound}>
              <NotificationsOffRoundedIcon />
            </IconButton>
          )}
        </Box>
        {notify.data.length === 0 && <img src={ImageNotify} alt="imag" width="100%" />}
        {notify.data.map((msg, index) => (
          <Link
            to={msg.url ? `${msg.url}` : ''}
            style={{ textDecoration: 'none' }}
            onClick={() => handleIsRead(msg)}
            className={classes.pc}
          >
            <MenuItem key={index} onClick={() => handleIsRead(msg)} style={{ padding: 0 }}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar src={msg.user.avatar}></Avatar>
                </ListItemAvatar>
                {msg.content ? (
                  <ListItemText
                    primary={
                      <div style={{ color: 'black' }}>
                        <strong style={{ fontSize: '17px' }}>{msg.user.username}</strong> {`${msg.text}`}
                      </div>
                    }
                    secondary={<>{msg.content.slice(0, 20)}...</>}
                  />
                ) : (
                  <ListItemText
                    primary={
                      <div style={{ color: 'black' }}>
                        <strong style={{ fontSize: '17px' }}>{msg.user.username}</strong> {`${msg.text}`}
                      </div>
                    }
                  />
                )}
              </ListItem>
              <ListItemSecondaryAction style={{ right: '30px' }}>
                {msg.image && (
                  <>
                    {msg.image.match(/video/i) ? (
                      <video className={classes.small} src={msg.image} width="5%" />
                    ) : (
                      <Avatar className={classes.small} src={msg.image}></Avatar>
                    )}
                  </>
                )}
                {msg.request && (
                  <Button variant="contained" color='primary' style={{marginTop: '15px', fontSize: '12px', height: '25px'}} onClick={() => handleAccept(msg.id, msg._id, msg.user)}>Đồng ý</Button>
                )}
                <ListItemText secondary={moment(msg.createdAt).fromNow()} />
              </ListItemSecondaryAction>
              {!msg.isRead && (
                <ListItemSecondaryAction style={{ right: '4px' }}>
                  <FiberManualRecordRoundedIcon style={{ fontSize: '15px' }} />
                </ListItemSecondaryAction>
              )}
            </MenuItem>
          </Link>
        ))}
        {notify.data.map((msg, index) => (
          <Link to={`${msg.url}`} style={{ textDecoration: 'none' }} onClick={handleClose} className={classes.mobie}>
            <MenuItem key={index} onClick={handleClose} style={{ padding: 0 }}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar src={msg.user.avatar}></Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <div style={{ color: 'black' }}>
                      <strong>{msg.user.username}</strong>
                    </div>
                  }
                  secondary={msg.text}
                />
              </ListItem>
              <ListItemSecondaryAction style={{ right: '30px' }}>
                {msg.image && (
                  <>
                    {msg.image.match(/video/i) ? (
                      <video className={classes.smallmobie} src={msg.image} width="5%" />
                    ) : (
                      <Avatar className={classes.smallmobie} src={msg.image}></Avatar>
                    )}
                  </>
                )}
                {msg.request && (
                  <Button variant="contained" color='primary' style={{marginTop: '15px', fontSize: '12px', height: '25px'}} onClick={() => handleAccept(msg.id, msg._id, msg.user)}>Đồng ý</Button>
                )}
              </ListItemSecondaryAction>
              {!msg.isRead && (
                <ListItemSecondaryAction style={{ right: '4px' }}>
                  <FiberManualRecordRoundedIcon style={{ fontSize: '15px' }} />
                </ListItemSecondaryAction>
              )}
            </MenuItem>
          </Link>
        ))}
        <Box className={classes.titlee}>
          {notify.data.length > 0 && (
            <Typography onClick={handleDeleteNotify} style={{ marginTop: '5px', cursor: 'wait' }}>
              Xóa tất cả
            </Typography>
          )}
        </Box>
      </Menu>
    </div>
  );
}

export default NotifyModal;
