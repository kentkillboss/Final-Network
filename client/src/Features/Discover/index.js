import { Grid, makeStyles } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { getDataAPI } from 'api/fetchData';
import LeftBar from 'Features/Home/components/LeftBar';
import PostThumb from 'Features/Profile/components/PostThumb';
import LoadIcon from 'images/load.gif';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { DISCOVER_TYPES, getDiscoverPosts } from 'Redux/Action/discoverAction';
import LoadMoreBtn from './components/LoadMoreBtn';

Discover.propTypes = {};

const useStyles = makeStyles((theme) => ({
  bookmark: {
    display: 'block',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));

function Discover(props) {
  const classes = useStyles();
  const { auth, discover, theme } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (!discover.firstLoad) {
      dispatch(getDiscoverPosts(auth.token));
    }
  }, [dispatch, auth.token, discover.firstLoad]);

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(`post_discover?num=${discover.page * 9}`, auth.token);
    dispatch({ type: DISCOVER_TYPES.UPDATE_POST, payload: res.data });
    setLoad(false);
  };

  return (
    <div>
      <Grid container>
        <Grid className={classes.bookmark} item lg={3} md={3} xs={0} sm={0}>
          <LeftBar />
        </Grid>
        {/* <Grid item lg={3} md={3} xs={0} sm={0} style={{ display: 'block', backgroundColor: theme ? '#e7e6e5' : '#f0f2f5' }}></Grid> */}
        <Grid item lg={8} md={8} xs={12} sm={12} style={{ display: 'block', backgroundColor: theme ? '#dbdad9' : '#ffffff' }}>
          <Grid container>
            {discover.loading ? (
              <>
                {discover.posts.slice(0, 4).map((post) => (
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Link to={`/post/${post._id}`}>
                      <Skeleton variant="rect" width={210} height={150} style={{ borderRadius: '7px' }} />
                    </Link>
                  </Grid>
                ))}
              </>
            ) : (
              discover.posts.map((post) => (
                <Grid item xs={6} sm={6} md={4} lg={3}>
                  <Link to={`/post/${post._id}`}>
                    <PostThumb posts={post} />
                  </Link>
                </Grid>
              ))
            )}
            {load && <img src={LoadIcon} alt="loading" />}
            {!discover.loading && (
              <LoadMoreBtn result={discover.result} page={discover.page} load={load} handleLoadMore={handleLoadMore} />
            )}
          </Grid>
        </Grid>
        <Grid item lg={1} md={1} xs={0} sm={0} style={{ display: 'block', backgroundColor: theme ? '#e7e6e5' : '#f0f2f5' }}></Grid>
      </Grid>
    </div>
  );
}

export default Discover;
