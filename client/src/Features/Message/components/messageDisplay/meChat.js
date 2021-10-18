import { Avatar, Box, Button, ListItemText, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMessages } from 'Redux/Action/messageAction';
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
    marginRight: '10px',
    background: '#ec7d14',
    color: 'white',
    border: '1px solid #ec7d14',
    borderRadius: '14px 14px 0 14px',
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
    marginRight: '10px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '100%',
    },
  },
  contentBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'end',
    flexDirection: 'column',
  },
  deleteIcon: {
    cursor: 'pointer',
    opacity: 0,
    marginRight: '10px',
  },
  iconVideo: {
    display: 'flex',
    backgroundColor: '#eee',
    padding: '0 10px',
    borderRadius: '5px',
  },
  boxContent: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  boxFlex: {
    '&:hover $deleteIcon': {
      opacity: 1,
    },
    alignItems: 'end',
  },
}));

function MessageDisplay({ user, msg, data }) {
  const classes = useStyles();
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  const handleDeleteMessages = () => {
    if (!data) return;

    if (window.confirm('Bạn chắc chắn xoá!')) {
      dispatch(deleteMessages({ msg, data, auth }));
    }
  };

  const imageShow = (src) => {
    return <img width="100%" height="100%" style={{ borderRadius: '10px' }} src={src} alt="images" />;
  };
  const videoShow = (src) => {
    return <video width="100%" height="100%" controls src={src} alt="images" />;
  };
  return (
    <>
      <Box className={classes.boxContent}>
        <Box style={{ display: 'flex' }} className={classes.boxFlex}>
          <DeleteIcon className={classes.deleteIcon} onClick={handleDeleteMessages} />
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
                <Box style={{ marginRight: '4px' }}>
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
                    secondary={
                      msg.call.times > 0 ? (
                        <Times total={msg.call.times} />
                      ) : (
                        new Date(msg.createdAt).toLocaleTimeString()
                      )
                    }
                  />
                </Box>
              </Box>
            )}
          </Box>
        </Box>
        <Box className={classes.title}>
          <Avatar className={classes.avatar} src={user.avatar} />
        </Box>
      </Box>

      <Box className={classes.time}>{new Date(msg.createdAt).toLocaleString()}</Box>
    </>
  );
}

export default MessageDisplay;
