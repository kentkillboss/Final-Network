import { Grid, makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import Posts from './components/Post';
import Status from './components/Status';
import PostLoading from 'Components/Loading/SkeletonPost';

import Header from 'Components/Header';
import LeftBar from './components/LeftBar';
import RightBar from './components/RightBar';

const useStyles = makeStyles((theme) => ({
  // root: {
  //   flexGrow: 1,
  // },
  // paper: {},
  right: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
    backgroundColor: '#f0f2f5',
  },
  box: {
    backgroundColor: '#f0f2f5',
  },
  container: {
    backgroundColor: '#f0f2f5',
  },
}));

function Home(props) {
  const classes = useStyles();
  const { posts } = useSelector((state) => state);
  return (
    <div>
      <Grid container className={classes.container}>
        <Grid item sm={2} xs={2}>
          <LeftBar />
        </Grid>
        <Grid item sm={1} xs={0} className={classes.box} />
        <Grid item sm={5} xs={10} className={classes.box}>
          <Status />
          {posts.loading ? (
            <PostLoading />
          ) : posts.result === 0 && posts.posts.length === 0 ? (
            <h2>No Post</h2>
          ) : (
            <Posts />
          )}
        </Grid>
        <Grid item sm={1} xs={0} className={classes.box} />
        <Grid item sm={3} className={classes.right}>
          <RightBar />
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
