import { Grid, makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import Posts from './components/Post';
import Status from './components/Status';
import PostLoading from 'Components/Loading/SkeletonPost';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingTop: theme.spacing(10),
  },
  paper: {},
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
          {posts.loading ? <PostLoading /> : posts.result === 0 ? <h2>No Post</h2> : <Posts />}
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>xs</Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
