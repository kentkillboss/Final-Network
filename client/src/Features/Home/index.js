import { Grid, makeStyles } from '@material-ui/core';
import PostLoading from 'Components/Loading/SkeletonPost';
import React from 'react';
import { useSelector } from 'react-redux';
import LeftBar from './components/LeftBar';
import Posts from './components/Post';
import RightBar from './components/RightBar';
import Status from './components/Status';

const useStyles = makeStyles((theme) => ({
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
        <Grid item sm={3} xs={0} className={classes.right}>
          <RightBar />
        </Grid>
      </Grid>
    </div>
  );
}

export default Home;
