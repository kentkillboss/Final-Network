import { Box, IconButton, makeStyles, Typography } from '@material-ui/core';
import Avatar from 'Components/Avatar/Avatar';
import React from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PhoneDisabledRoundedIcon from '@material-ui/icons/PhoneDisabledRounded';
import PhoneIcon from '@material-ui/icons/Phone';
import CameraRoundedIcon from '@material-ui/icons/CameraRounded';
import { GLOBALTYPES } from 'Redux/Action/globalTypes';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1200,
    background: '#0008',
    width: '100%',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  callBox: {
    width: '100%',
    maxWidth: '400px',
    display: 'flex',
    background: '#000234',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    color: 'white',
    padding: '50px 0',
    borderRadius: '5px',
    boxShadow: '0 0 5px #000234',
  },
  user: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
  },
  callMenu: {
    minWidth: '280px',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
  },
}));

function CallModal(props) {
  const classes = useStyles();
  const { auth, call } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [mins, setMins] = useState(0);
  const [second, setSecond] = useState(0);
  const [total, setTotal] = useState(0);
  const [answer, setAnswer] = useState(false);

  useEffect(() => {
    const setTime = () => {
        setTotal(t => t + 1);
        setTimeout(setTime, 1000);
    }
    setTime();
    return () => setTotal(0);
  }, [])

  useEffect(() => {
      setSecond(total%60);
      setMins(parseInt(total/60));
  }, [total])

  const handleEndCall = () => {
    dispatch({type: GLOBALTYPES.CALL, payload: null})
  }

  useEffect(() => {
      if(answer){
          setTotal(0);
      }else{
          const timer = setTimeout(() => {
        dispatch({type: GLOBALTYPES.CALL, payload: null})
      }, 15000);
      return () => clearTimeout(timer);
      }
      
  }, [dispatch, answer])

  const handleAnswer = () => {
    setAnswer(true);
  }

  return (
    <Box className={classes.root}>
      <Box className={classes.callBox}>
        <Box style={{ textAlign: 'center', padding: '40px' }}>
          <Avatar src={call.avatar} size={classes.user} />
          <Typography style={{ marginTop: '5px' }} component="h4">
            {call.username}
          </Typography>
          <Typography style={{ marginTop: '5px' }} component="h6">
            {call.fullname}
          </Typography>
          <Box>{call.video ? <span>calling video...</span> : <span>calling audio...</span>}</Box>
        </Box>
        <Box className={classes.timer}>
          <small>{mins.toString().length < 2 ? '0' + mins : mins}</small>
          <small>:</small>
          <small>{second.toString().length < 2 ? '0' + second : second}</small>
        </Box>
        <Box className={classes.callMenu}>
          <IconButton onClick={handleEndCall}>
            <PhoneDisabledRoundedIcon style={{ color: 'red' }} />
          </IconButton>
          <>
            {call.video ? (
              <IconButton style={{ color: 'green' }} onClick={handleAnswer}>
                <CameraRoundedIcon />
              </IconButton>
            ) : (
              <IconButton>
                <PhoneIcon style={{ color: 'green' }} onClick={handleAnswer}/>
              </IconButton>
            )}
          </>
        </Box>
      </Box>
    </Box>
  );
}

export default CallModal;
