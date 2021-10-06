import React from 'react';
import PropTypes from 'prop-types';
import { Box, IconButton, makeStyles, Menu, MenuItem, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import NotificationsOffRoundedIcon from '@material-ui/icons/NotificationsOffRounded';
import NotificationsRoundedIcon from '@material-ui/icons/NotificationsRounded';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { useSelector } from 'react-redux';
import moment from 'moment';
import FiberManualRecordRoundedIcon from '@material-ui/icons/FiberManualRecordRounded';
import ImageNotify from 'images/notify.png';
import { useState } from 'react';

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
    width: '30%',
    // height: '100%',
    maxHeight: 'unset',
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
  const { auth, notify } = useSelector((state) => state);
  const handleClose = () => {
    setShowMenu(false);
  };

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
            <IconButton>
              {' '}
              <NotificationsRoundedIcon />{' '}
            </IconButton>
          ) : (
            <IconButton>
              <NotificationsOffRoundedIcon />
            </IconButton>
          )}
        </Box>
        {notify.data.length === 0 && <img src={ImageNotify} alt="imag" width="100%" />}
        {notify.data.map((msg, index) => (
          <Link to={`${msg.url}`} style={{ textDecoration: 'none' }} onClick={handleClose} className={classes.pc}>
            <MenuItem key={index} onClick={handleClose} style={{ padding: 0 }}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar src={msg.user.avatar}></Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <div style={{ color: 'black' }}>
                      <strong style={{ fontSize: '17px' }}>{msg.user.username}</strong> {`${msg.text}`}
                    </div>
                  }
                  secondary={msg.content.slice(0, 20)}
                  //   {}
                />
                <ListItemText secondary={moment(msg.createdAt).fromNow()} />
              </ListItem>
              <ListItemSecondaryAction style={{ right: '30px' }}>
                <Avatar className={classes.small} src={msg.image}></Avatar>
              </ListItemSecondaryAction>
              {!msg.isRead && (
                <ListItemSecondaryAction style={{ right: '4px' }}>
                  <FiberManualRecordRoundedIcon fontSize="small" />
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
                <Avatar className={classes.smallmobie} src={msg.image}></Avatar>
              </ListItemSecondaryAction>
              {!msg.isRead && (
                <ListItemSecondaryAction style={{ right: '4px' }}>
                  <FiberManualRecordRoundedIcon fontSize="small" />
                </ListItemSecondaryAction>
              )}
            </MenuItem>
          </Link>
        ))}
        <Box className={classes.titlee}>
          <Typography style={{ marginTop: '5px', cursor: 'wait' }}>Xóa tất cả</Typography>
        </Box>
      </Menu>
    </div>
  );
}

export default NotifyModal;
