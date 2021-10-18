import { Avatar, Box, Button, ListItemText, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import PhoneDisabledRoundedIcon from '@material-ui/icons/PhoneDisabledRounded';
import VideocamOffRoundedIcon from '@material-ui/icons/VideocamOffRounded';
import VideocamRoundedIcon from '@material-ui/icons/VideocamRounded';
import CallRoundedIcon from '@material-ui/icons/CallRounded';
import Times from '../Times';

const useStyles = makeStyles((theme) => ({
  title: {
    display: 'flex',
    flexDirection: 'column-reverse',
  },
  avatar: {
    [theme.breakpoints.down('sm')]: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
  },
  content: {
    padding: '9px 14px',
    marginBottom: '5px',
    marginLeft: '10px',
    background: '#e4e6eb',
    color: 'black',
    border: '1px solid #e4e6eb',
    borderRadius: '14px 14px 14px 0',
  },
  contentBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'start',
    flexDirection: 'column',
  },
  contentText: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '12px',
    },
  },
  time: {
    fontSize: '13px',
    color: 'grey',
    [theme.breakpoints.down('sm')]: {
      fontSize: '10px',
    },
  },
  box: {
    width: '100%',
    height: '90%',
    marginTop: '5px',
    marginLeft: '10px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '100%',
    },
  },
  iconVideo: {
    display: 'flex',
    backgroundColor: '#eee',
    padding: '0 10px',
    borderRadius: '5px',
  },
}));

function MessageDisplayOther({ user, msg }) {
  const classes = useStyles();
  const imageShow = (src) => {
    return <img width="100%" height="100%" style={{ borderRadius: '10px' }} src={src} alt="images" />;
  };
  const videoShow = (src) => {
    return <video width="100%" height="100%" controls src={src} alt="images" />;
  };
  return (
    <>
      <Box style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Box className={classes.title}>
          <Avatar className={classes.avatar} src={user.avatar} />
        </Box>
        <Box className={classes.contentBox}>
          {msg.text && (
            <Box className={classes.content}>
              <Typography className={classes.contentText}>{msg.text}</Typography>
            </Box>
          )}
          {msg.media.map((item, index) => (
            <Box className={classes.box} key={index}>
              {item.url.match(/video/i) ? videoShow(item.url) : imageShow(item.url)}
            </Box>
          ))}
          {msg.call && (
            <Box
              style={{ fontSize: '2.5rem', color: msg.call.times === 0 ? 'red' : 'green' }}
              className={classes.iconVideo}
            >
              <Box>
                {msg.call.times === 0 ? (
                  msg.call.video ? (
                    <VideocamOffRoundedIcon />
                  ) : (
                    <PhoneDisabledRoundedIcon />
                  )
                ) : msg.call.video ? (
                  <VideocamRoundedIcon />
                ) : (
                  <CallRoundedIcon />
                )}
              </Box>
              <Box>
                <ListItemText
                  primary={msg.call.video ? 'Video Call' : 'Audio Call'}
                  secondary={msg.call.times > 0 ? <Times /> : new Date(msg.createdAt).toLocaleTimeString()}
                />
              </Box>
            </Box>
          )}
        </Box>
      </Box>
      <Box className={classes.time}>{new Date(msg.createdAt).toLocaleString()}</Box>
    </>
  );
}

export default MessageDisplayOther;
