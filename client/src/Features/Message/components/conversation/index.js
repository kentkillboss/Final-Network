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
        <Grid item xs={0} sm={4} className={classes.leftSide}>
          <LeftSide />
        </Grid>
        <Grid item xs={12} sm={8} style={{ display: 'block', backgroundColor: theme ? '#e7e6e5' : '#ffffff'}}>
          <RightSide />
        </Grid>
      </Grid>
    </div>
  );
}

export default Conversation;
