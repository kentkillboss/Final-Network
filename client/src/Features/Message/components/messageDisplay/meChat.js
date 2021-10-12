import { Avatar, Box, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { deleteMessages } from 'Redux/Action/messageAction';

const useStyles = makeStyles((theme) => ({
  title: {
    display: 'flex',
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
  time: {
    fontSize: '13px',
    color: 'grey',
  },
  box: {
    width: '65%',
    height: '90%',
  },
  contentBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '&:hover $deleteIcon':{
      opacity: 1
    }
  },
  deleteIcon: {
    cursor: 'pointer',
    opacity: 0
  }
}));

function MessageDisplay({ user, msg, data }) {
  const classes = useStyles();
  const {auth} = useSelector(state => state);
  const dispatch = useDispatch();

  const handleDeleteMessages = () => {
    if(!data) return;

    if(window.confirm('Bạn chắc chắn xoá!')){
      dispatch(deleteMessages({msg, data, auth}));
    }
  }

  const imageShow = (src) => {
    return <img width="100%" height="100%" style={{ borderRadius: '10px' }} src={src} alt="images" />;
  };
  const videoShow = (src) => {
    return <video width="100%" height="100%" controls src={src} alt="images" />;
  };
  return (
    <>
      <Box className={classes.title}>
        <Avatar src={user.avatar} />
        {/* <Typography style={{ paddingTop: '5%' }}>{user.username}</Typography> */}
      </Box>
      <Box className={classes.contentBox}>
        <DeleteIcon className={classes.deleteIcon} onClick={handleDeleteMessages} />
          {msg.text && (
          <Box className={classes.content}>
            <Typography>{msg.text}</Typography>
          </Box>
          )}
          {msg.media.map((item, index) => (
            <Box className={classes.box} key={index}>
              {item.url.match(/video/i) ? videoShow(item.url) : imageShow(item.url)}
            </Box>
          ))}
          
      </Box>
      
      <Box className={classes.time}>{new Date(msg.createdAt).toLocaleString()}</Box>
    </>
  );
}

export default MessageDisplay;
