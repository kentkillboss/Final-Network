import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { getPost } from 'Redux/Action/postAction';
import LoadIcon from 'images/load.gif';
import { Box, Card, Grid } from '@material-ui/core';
import Posts from 'Features/Home/components/Post/index';
import PostContent from 'Features/Home/components/Post/PostContent';
import PostBody from 'Features/Home/components/Post/PostBody';
import PostFooter from 'Features/Home/components/Post/PostFooter';
import Comment from 'Features/Home/components/Comments/Comment';
import InputComment from 'Features/Home/components/Comments/InputComment';

Post.propTypes = {};

function Post(props) {
  const { id } = useParams();
  const { auth, detailPost } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [post, setPost] = useState([]);

  useEffect(() => {
    dispatch(getPost({ detailPost, id, auth }));
    if (detailPost.length > 0) {
      const newArr = detailPost.filter((post) => post._id === id);
      setPost(newArr);
    }
  }, [detailPost, dispatch, id, auth]);

  return (
    <Box>
      {post.length === 0 && <img src={LoadIcon} alt="loading" />}
      {post.map((item) => (
        <Grid container style={{ justifyContent: 'center' }}>
          <Grid item xs={6}>
            <Card key={item._id} style={{ margin: '0', marginBottom: '25px' }}>
              <PostContent post={item} />
              <PostBody post={item} />
              <PostFooter post={item} />

              <Comment post={item} />
              <InputComment post={item} />
            </Card>
          </Grid>
        </Grid>
      ))}
    </Box>
  );
}

export default Post;
