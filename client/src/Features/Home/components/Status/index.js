import { Box, Button, makeStyles, Paper } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GLOBALTYPES } from 'Redux/Action/globalTypes';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: theme.spacing(10),
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
    paddingBottom: '5px',
  },
  btn: {
    backgroundColor: '#f0f2f5',
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
              {auth.user.username}, Bạn đang nghĩ gì!!!
            </Button>
          </Box>
        </Box>
      </Paper>
    </div>
  );
}

export default Status;
