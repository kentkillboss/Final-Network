import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import LeftSide from '../LeftSide';
import RightSide from '../RightSide';
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  leftSide: {
    display: 'block',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));

function Conversation(props) {
  const classes = useStyles();
  const {theme} = useSelector(state => state);
  return (
    <div>
      <Grid container>
        <Grid item lg={4} md={4} xs={0} sm={0} className={classes.leftSide}>
          <LeftSide />
        </Grid>
        <Grid item lg={8} md={8} xs={12} sm={12} style={{ display: 'block', backgroundColor: theme ? '#e7e6e5' : '#ffffff'}}>
          <RightSide />
        </Grid>
      </Grid>
    </div>
  );
}

export default Conversation;
