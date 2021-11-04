import { Avatar, Box, ListItemText, makeStyles, Typography } from '@material-ui/core';
import CallRoundedIcon from '@material-ui/icons/CallRounded';
import DescriptionRoundedIcon from '@material-ui/icons/DescriptionRounded';
import PhoneDisabledRoundedIcon from '@material-ui/icons/PhoneDisabledRounded';
import VideocamOffRoundedIcon from '@material-ui/icons/VideocamOffRounded';
import VideocamRoundedIcon from '@material-ui/icons/VideocamRounded';
import axios from 'axios';
import fileDownload from 'js-file-download';
import React from 'react';
import { useSelector } from 'react-redux';
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
  file: {
    display: 'flex',
    padding: '9px 0 9px 9px',
    marginBottom: '5px',
    marginRight: '10px',
    background: '#e4e6eb',
    color: 'black',
    border: '1px solid #e4e6eb',
    borderRadius: '14px 14px 14px 14px',
  },
}));

function MessageDisplayOther({ user, msg }) {
  const classes = useStyles();
  const { theme } = useSelector((state) => state);

  const handleDownload = (url, filename) => {
    axios
      .get(url, {
        responseType: 'blob',
      })
      .then((res) => {
        fileDownload(res.data, filename);
      });
  };

  const imageShow = (src) => {
    return (
      <img
        width="100%"
        height="100%"
        style={{ borderRadius: '10px', filter: theme ? 'invert(1)' : 'invert(0)' }}
        src={src}
        alt="images"
      />
    );
  };
  const videoShow = (src) => {
    return (
      <video
        width="100%"
        height="100%"
        controls
        src={src}
        alt="images"
        style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}
      />
    );
  };
  let newName = '';
  const fileShow = (src, tail, name) => {
    newName = name + tail.slice(26);
    return (
      <Box className={classes.file}>
        <Typography
          onClick={() => {
            handleDownload(src, newName);
          }}
          style={{ cursor: 'pointer', paddingLeft: '2px' }}
          className={classes.contentText}
        >
          {newName}
        </Typography>
        <DescriptionRoundedIcon />
      </Box>
    );
  };
  return (
    <>
      <Box style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Box className={classes.title}>
          <Avatar className={classes.avatar} src={user.avatar} style={{ filter: theme ? 'invert(1)' : 'invert(0)' }} />
        </Box>
        <Box className={classes.contentBox}>
          {msg.text && (
            <Box className={classes.content} style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}>
              <Typography className={classes.contentText}>{msg.text}</Typography>
            </Box>
          )}
          {msg.media.map((item, index) => (
            <Box className={classes.box} key={index}>
              {item.url.match(/video/i)
                ? videoShow(item.url)
                : item.url.includes('png') || item.url.includes('jpg')
                ? imageShow(item.url)
                : fileShow(item.url, item.public_id, item.fileName)}
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
                    <VideocamOffRoundedIcon style={{ filter: theme ? 'invert(1)' : 'invert(0)' }} />
                  ) : (
                    <PhoneDisabledRoundedIcon style={{ filter: theme ? 'invert(1)' : 'invert(0)' }} />
                  )
                ) : msg.call.video ? (
                  <VideocamRoundedIcon style={{ filter: theme ? 'invert(1)' : 'invert(0)' }} />
                ) : (
                  <CallRoundedIcon style={{ filter: theme ? 'invert(1)' : 'invert(0)' }} />
                )}
              </Box>
              <Box>
                <ListItemText
                  primary={msg.call.video ? 'Video Call' : 'Audio Call'}
                  secondary={
                    msg.call.times > 0 ? <Times total={msg.call.times} /> : new Date(msg.createdAt).toLocaleTimeString()
                  }
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
