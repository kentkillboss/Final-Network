import { Grid, makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import Posts from './components/Post';
import Status from './components/Status';
import PostLoading from 'Components/Loading/SkeletonPost';

const useStyles = makeStyles((theme) => ({
  right: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
}));

function Home(props) {
  const classes = useStyles();
  const { posts } = useSelector((state) => state);
  return (
    <div>
      <Grid container>
        <Grid item sm={2} xs={2}>
          <Paper className={classes.paper}>xs</Paper>
        </Grid>
        <Grid item sm={1} xs={0}/>
        <Grid item sm={5} xs={10}>
          <Status />
          {posts.loading ? <PostLoading /> : posts.result === 0 ? <h2>No Post</h2> : <Posts />}
        </Grid>
        <Grid item sm={1} xs={0}/>
        <Grid item sm={3} className={classes.right}>
          <Paper className={classes.paper}>xs</Paper>
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
