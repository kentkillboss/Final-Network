import { Box, Button, Card, Grid, Icon, IconButton, makeStyles, Paper, TextField } from '@material-ui/core';
import React from 'react';
import DuoRoundedIcon from '@material-ui/icons/DuoRounded';
import Typography from '@material-ui/core/Typography';
import CameraAltRoundedIcon from '@material-ui/icons/CameraAltRounded';
import EmojiEmotionsRoundedIcon from '@material-ui/icons/EmojiEmotionsRounded';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import { GLOBALTYPES } from 'Redux/Action/globalTypes';
import { useState } from 'react';
import StatusModal from './StatusModal';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  paperCenter: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    alignItems: 'center',
  },
  box: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: '5px',
  },
  box1: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: '5px',
  },
  btn: {
    backgroundColor: '#f1f1f1',
    border: 'none',
    outline: 'none',
    borderRadius: '30px',
    color: '#555',
    height: '40px',
    width: '96%',
  },
}));

function Status(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const [showModal, setShowModal] = useState(false);
  return (
    <div className={classes.root}>
      <Paper className={classes.paperCenter}>
        <Box className={classes.box1}>
          <Box>
            <Avatar src={auth.user.avatar} />
          </Box>
          <Box style={{ width: '100%' }}>
            <Button
              onClick={() => dispatch({ type: GLOBALTYPES.STATUS, payload: true })}
              fullWidth
              color="default"
              className={classes.btn}
            >
              Some things...
            </Button>
          </Box>
        </Box>
        <hr color="#f1f1f1"></hr>
        <Box className={classes.box}>
          <Box className={classes.box}>
            <DuoRoundedIcon />
            <Typography>Video truc tiep</Typography>
          </Box>
          <Box className={classes.box}>
            <CameraAltRoundedIcon />
            <Typography>Anh/Video</Typography>
          </Box>
          <Box className={classes.box}>
            <EmojiEmotionsRoundedIcon />
            <Typography>Cam xuc/Hoat dong</Typography>
          </Box>
        </Box>
        {/* {showModal && <StatusModal setShowModal={setShowModal} />} */}
      </Paper>
    </div>
  );
}

export default Status;
