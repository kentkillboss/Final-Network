import { Box, IconButton, makeStyles, Typography } from '@material-ui/core';
import Avatar from 'Components/Avatar/Avatar';
import React, { useCallback, useEffect, useState, useRef } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import PhoneDisabledRoundedIcon from '@material-ui/icons/PhoneDisabledRounded';
import PhoneIcon from '@material-ui/icons/Phone';
import CameraRoundedIcon from '@material-ui/icons/CameraRounded';
import { GLOBALTYPES } from 'Redux/Action/globalTypes';

import { addMessage } from 'Redux/Action/messageAction';
import Mp3 from 'audio/callmess.mp3';

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
  showVideo: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    pointerEvents: 'none',
  },
  ortheVideo: {
    width: '100%',
    height: '100%',
  },
  youVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '300px',
    borderRadius: '5px',
    border: '1px solid red',
    zIndex: 10,
  },
  endCall: {
    position: 'absolute',
    bottom: '30px',
    left: '50%',
    transform: 'translateX(-50%)',
    pointerEvents: 'initial',
    fontSize: '2rem',
    background: 'white',
    padding: '15px',
    borderRadius: '50%',
    cursor: 'pointer',
  },
  timeVideo: {
    position: 'absolute',
    bottom: '100px',
    left: '50%',
    transform: 'translateX(-50%)',
    color: 'white',
  },
}));

function CallModal(props) {
  const classes = useStyles();
  const { auth, call, peer, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [mins, setMins] = useState(0);
  const [second, setSecond] = useState(0);
  const [total, setTotal] = useState(0);
  const [answer, setAnswer] = useState(false);
  const [hours, setHours] = useState(0);
  const [tracks, setTracks] = useState(null);

  const youVideo = useRef();
  const ortheVideo = useRef();

  useEffect(() => {
    const setTime = () => {
      setTotal((t) => t + 1);
      setTimeout(setTime, 1000);
    };
    setTime();
    return () => setTotal(0);
  }, []);

  useEffect(() => {
    setSecond(total % 60);
    setMins(parseInt(total / 60));
    setHours(parseInt(total / 3600));
  }, [total]);

  const addCallMessage = useCallback(
    (call, times, disconnect) => {
      if (call.recipient !== auth.user._id || disconnect) {
        const msg = {
          sender: call.sender,
          recipient: call.recipient,
          text: '',
          media: [],
          call: { video: call.video, times },
          createdAt: new Date().toISOString(),
        };
        dispatch(addMessage({ msg, auth, socket }));
      }
    },
    [auth, dispatch, socket]
  );

  const handleEndCall = () => {
    if (tracks) {
      tracks.forEach((track) => track.stop());
    }
    let times = answer ? total : 0;
    socket.emit('endCall', { ...call, times });
    addCallMessage(call, times);
    dispatch({ type: GLOBALTYPES.CALL, payload: null });

  };

  useEffect(() => {
    if (answer) {
      setTotal(0);
    } else {
      const timer = setTimeout(() => {
        socket.emit('endCall', { ...call, times: 0 });
        addCallMessage(call, 0);
        dispatch({ type: GLOBALTYPES.CALL, payload: null });
      }, 20000);
      return () => clearTimeout(timer);
    }
  }, [dispatch, answer, call, socket, addCallMessage]);

  useEffect(() => {
    socket.on('endCallToClient', (data) => {
      if (tracks) {
        tracks.forEach((track) => track.stop());
      }
      addCallMessage(data, data.times);
      dispatch({ type: GLOBALTYPES.CALL, payload: null });
    });
    return () => socket.off('endCallToClient');
  }, [socket, dispatch, tracks, addCallMessage]);

  //Stream media
  const openStream = (video) => {
    const config = { audio: true, video };
    return navigator.mediaDevices.getUserMedia(config);
  };

  const playStream = (tag, stream) => {
    let video = tag;
    video.srcObject = stream;
    video.play();
  };

  const handleAnswer = () => {
    openStream(call.video).then((stream) => {
      playStream(youVideo.current, stream);
      const track = stream.getTracks();
      setTracks(track);

      const newCall = peer.call(call.peerId, stream);
      newCall.on('stream', function (remoteStream) {
        playStream(ortheVideo.current, remoteStream);
      });
      setAnswer(true);
      // setNewCall(newCall)
    });
  };

  useEffect(() => {
    peer.on('call', (newCall) => {
      openStream(call.video).then((stream) => {
        if (youVideo.current) {
          playStream(youVideo.current, stream);
        }
        const track = stream.getTracks();
        setTracks(track);

        newCall.answer(stream);
        newCall.on('stream', function (remoteStream) {
          if (ortheVideo.current) {
            playStream(ortheVideo.current, remoteStream);
          }
        });
        setAnswer(true);
        // setNewCall(newCall)
      });
    });
    return () => peer.removeListener('call');
  }, [peer, call.video]);

  //Disconnect
  useEffect(() => {
    socket.on('callerDisconnect', () => {
      if (tracks) {
        tracks.forEach((track) => track.stop());
      }
      let times = answer ? total : 0;
      addCallMessage(call, times, true);
      dispatch({ type: GLOBALTYPES.CALL, payload: null });
      dispatch({ type: GLOBALTYPES.ALERT, payload: { error: `${call.username} mất kết nối!!` } });
    });
    return () => socket.off('callerDisconnect');
  }, [socket, tracks, dispatch, call, addCallMessage, answer, total]);

  //audio message
  const playAudio = (newAudio) => {
    newAudio.play();
  };
  const pauseAudio = (newAudio) => {
    newAudio.pause();
    newAudio.currentTime = 0;
  };

  useEffect(() => {
    let newAudio = new Audio(Mp3);
    if (answer) {
      pauseAudio(newAudio);
    } else {
      playAudio(newAudio);
    }
    return () => pauseAudio(newAudio);
  }, [answer]);
  return (
    <Box className={classes.root}>
      <Box className={classes.callBox} style={{ display: answer && call.video ? 'none' : 'flex' }}>
        <Box style={{ textAlign: 'center', padding: '40px' }}>
          <Avatar src={call.avatar} size={classes.user} />
          <Typography style={{ marginTop: '5px' }} component="h4">
            {call.username}
          </Typography>
          <Typography style={{ marginTop: '5px' }} component="h6">
            {call.fullname}
          </Typography>
          {answer ? (
            <Box>
              <span>{hours.toString().length < 2 ? '0' + hours : hours}</span>
              <span>:</span>
              <span>{mins.toString().length < 2 ? '0' + mins : mins}</span>
              <span>:</span>
              <span>{second.toString().length < 2 ? '0' + second : second}</span>
            </Box>
          ) : (
            <Box>{call.video ? <span>calling video...</span> : <span>calling audio...</span>}</Box>
          )}
        </Box>

        {!answer && (
          <Box className={classes.timer}>
            <small>{mins.toString().length < 2 ? '0' + mins : mins}</small>
            <small>:</small>
            <small>{second.toString().length < 2 ? '0' + second : second}</small>
          </Box>
        )}

        <Box className={classes.callMenu}>
          <IconButton onClick={handleEndCall}>
            <PhoneDisabledRoundedIcon style={{ color: 'red' }} />
          </IconButton>
          {call.recipient === auth.user._id && !answer && (
            <>
              {call.video ? (
                <IconButton style={{ color: 'green' }} onClick={handleAnswer}>
                  <CameraRoundedIcon />
                </IconButton>
              ) : (
                <IconButton>
                  <PhoneIcon style={{ color: 'green' }} onClick={handleAnswer} />
                </IconButton>
              )}
            </>
          )}
        </Box>
      </Box>
      <Box className={classes.showVideo} style={{ opacity: answer && call.video ? '1' : '0' }}>
        <video ref={youVideo} className={classes.youVideo} />
        <video ref={ortheVideo} className={classes.ortheVideo} />
        <Box className={classes.timeVideo}>
          <span>{hours.toString().length < 2 ? '0' + hours : hours}</span>
          <span>:</span>
          <span>{mins.toString().length < 2 ? '0' + mins : mins}</span>
          <span>:</span>
          <span>{second.toString().length < 2 ? '0' + second : second}</span>
        </Box>
        <IconButton className={classes.endCall} onClick={handleEndCall}>
          <PhoneDisabledRoundedIcon style={{ color: 'red' }} />
        </IconButton>
      </Box>
    </Box>
  );
}

export default CallModal;
