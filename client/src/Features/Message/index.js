import { Grid, makeStyles } from '@material-ui/core';
import ImgMess from 'images/image-mess.png';
import React from 'react';
import { useSelector } from 'react-redux';
import LeftSide from './components/LeftSide/index.js';

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
  const {theme} = useSelector(state => state);
  return (
    <div>
      <Grid container >
        <Grid item lg={4} md={4} xs={12} sm={12} style={{ display: 'block'}}>
          <LeftSide />
        </Grid>
        <Grid item lg={8} md={8} xs={0} sm={0} style={{ display: 'block', backgroundColor: theme ? '#e7e6e5' : '#ffffff'}}>
          <img className={classes.img} src={ImgMess} alt="mess"  style={{filter: theme ? 'invert(1)' : 'invert(0)'}}></img>
        </Grid>
      </Grid>
    </div>
  );
}

export default Message;
