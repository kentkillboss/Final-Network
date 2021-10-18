import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import LeftSide from '../LeftSide';
import RightSide from '../RightSide';

const useStyles = makeStyles((theme) => ({
  leftSide: {
    display: 'block',
    paddingTop: '60px',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));

function Conversation(props) {
  const classes = useStyles();
  return (
    <div>
      <Grid container>
        <Grid item xs={0} sm={4} className={classes.leftSide}>
          <LeftSide />
        </Grid>
        <Grid item xs={12} sm={8} style={{ display: 'block', paddingTop: '60px' }}>
          <RightSide />
        </Grid>
      </Grid>
    </div>
  );
}

export default Conversation;
