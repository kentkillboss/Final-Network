import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Card, makeStyles } from '@material-ui/core';
import PostContent from './PostContent';
import PostFooter from './PostFooter';
import PostBody from './PostBody';
import Comment from 'Features/Home/components/Comments/Comment';
import InputComment from '../Comments/InputComment';
import { POST_TYPES } from 'Redux/Action/postAction';
import { getDataAPI } from 'api/fetchData';
import { useState } from 'react';
import LoadIcon from 'images/load.gif';
import LoadMoreBtn from 'Features/Discover/components/LoadMoreBtn';
import InfiniteScroll from 'react-infinite-scroll-component';
import PostLoading from 'Components/Loading/SkeletonPost';

Posts.propTypes = {};
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 2px 5px',
  },
  box: {
    width: '100%',
    marginTop: theme.spacing(1),
    // boxShadow: 'rgba(0, 0, 0, 0.24) 0px 2px 5px',
  },
}));
function Posts(props) {
  const classes = useStyles();
  const { posts, auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const [hasMore, sethasMore] = useState(true);
  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(`posts?limit=${posts.page * 3}`, auth.token);
    dispatch({ type: POST_TYPES.GET_POSTS, payload: { ...res.data, page: posts.page + 1 } });
    if (res.length === 0 || res.length < 20) {
      sethasMore(false);
    }
    setLoad(false);
  };

  return (
    <Box className={classes.box}>
      <InfiniteScroll
        dataLength={posts.posts.length} //This is important field to render the next data
        next={handleLoadMore}
        hasMore={true}
        loader={''}
        endMessage={<h1>End</h1>}
      >
        {posts.posts.map((post) => (
          <Card key={post._id} className={classes.root} style={{ margin: '0', marginBottom: '25px' }}>
            <PostContent post={post} />
            <PostBody post={post} />
            <PostFooter post={post} />

            <Comment post={post} />
            <InputComment post={post} />
          </Card>
        ))}
      </InfiniteScroll>
      {load && <PostLoading />}

      <LoadMoreBtn result={posts.result} page={posts.page} load={load} handleLoadMore={handleLoadMore} />
    </Box>
  );
}

export default Posts;
