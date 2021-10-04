import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { getDiscoverPosts, DISCOVER_TYPES } from 'Redux/Action/discoverAction';
import LoadIcon from 'images/load.gif';
import PostThumb from 'Features/Profile/components/PostThumb';
import LoadMoreBtn from './components/LoadMoreBtn';
import { getDataAPI } from 'api/fetchData';
import { Box, Grid } from '@material-ui/core';
import LeftBar from 'Features/Home/components/LeftBar';
import { Link } from 'react-router-dom';

Discover.propTypes = {};

function Discover(props) {
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
    const res = await getDataAPI(`post_discover?limit=${discover.page * 9}`, auth.token);
    dispatch({ type: DISCOVER_TYPES.UPDATE_POST, payload: res.data });
    setLoad(false);
  };

  return (
    <div>
      <Grid container>
        <Grid item xs={2}>
          <LeftBar />
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={8} style={{ display: 'block' }} style={{ paddingTop: '80px' }}>
          <Grid container>
            {discover.loading ? (
              <img src={LoadIcon} alt="loading" />
            ) : (
              discover.posts.map((post) => (
                <Grid item xs={12} sm={6} md={4} lg={3}>
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
        {/* <Grid item xs={2}></Grid> */}
      </Grid>
    </div>
  );
}

export default Discover;
