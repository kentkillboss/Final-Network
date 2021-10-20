import { Grid } from '@material-ui/core';
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
    const res = await getDataAPI(`post_discover?num=${discover.page * 9}`, auth.token);
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
        <Grid item xs={8} style={{ display: 'block', paddingTop: '80px' }}>
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
