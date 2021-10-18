import React from 'react';
import PropTypes from 'prop-types';
import { Grid, makeStyles } from '@material-ui/core';
import LeftSide from './components/LeftSide/index.js';
import RightSide from './components/RightSide/index.js';
import ImgMess from 'images/image-mess.png';

Message.propTypes = {};
const useStyles = makeStyles((theme) => ({
  img: {
    position: 'absolute',
    top: '41%',
    right: '25%',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));

function Message(props) {
  const classes = useStyles();
  return (
    <div>
      <Grid container>
        <Grid item xs={12} sm={4} style={{ display: 'block', paddingTop: '60px' }}>
          <LeftSide />
        </Grid>
        <Grid item xs={0} sm={8} style={{ display: 'block', paddingTop: '60px' }}>
          <img className={classes.img} src={ImgMess} alt="mess"></img>
        </Grid>
      </Grid>
    </div>
  );
}

export default Message;
