import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { getDiscoverPosts, DISCOVER_TYPES } from 'Redux/Action/discoverAction';
import LoadIcon from 'images/load.gif';
import PostThumb from 'Features/Profile/components/PostThumb';
import LoadMoreBtn from './components/LoadMoreBtn';
import { getDataAPI } from 'api/fetchData';
import { Grid } from '@material-ui/core';

Discover.propTypes = {};

function Discover(props) {
  const { auth, discover } = useSelector((state) => state);
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
      <Grid item xs={2}></Grid>
      <Grid item xs={8}>
      {discover.loading ? (
        <img src={LoadIcon} alt="loading" />
      ) : (
        <PostThumb posts={discover.posts} result={discover.result} />
      )}
      {load && <img src={LoadIcon} alt="loading" />}
      {!discover.loading && (
        <LoadMoreBtn result={discover.result} page={discover.page} load={load} handleLoadMore={handleLoadMore} />
      )}
      </Grid>
      <Grid item xs={2}></Grid>
      </Grid>
    </div>
    
  );
}

export default Discover;
