import { Box, Button, Grid, makeStyles, Paper, TextField } from '@material-ui/core';
import Header from 'Components/Header';
import React from 'react';
import { useSelector } from 'react-redux';
import Posts from './components/Post';
import Status from './components/Status';
import LoadIcon from 'images/load.gif';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: theme.spacing(10),
  },
}));

function Home(props) {
  const classes = useStyles();
  const { posts } = useSelector((state) => state);
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs>
          <Paper className={classes.paper}>xs</Paper>
        </Grid>
        <Grid item xs={6}>
          <Status />
          {posts.loading ? <img src={LoadIcon} alt="loading" /> : posts.result === 0 ? <h2>No Post</h2> : <Posts />}
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>xs</Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
