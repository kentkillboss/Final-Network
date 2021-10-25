import { Box, Card, Grid } from '@material-ui/core';
import Comment from 'Features/Home/components/Comments/Comment';
import InputComment from 'Features/Home/components/Comments/InputComment';
import PostBody from 'Features/Home/components/Post/PostBody';
import PostContent from 'Features/Home/components/Post/PostContent';
import PostFooter from 'Features/Home/components/Post/PostFooter';
import LoadIcon from 'images/load.gif';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getPost } from 'Redux/Action/postAction';

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
    <Box style={{ paddingTop: '10px' }}>
      {post.length === 0 && <img src={LoadIcon} alt="loading" />}
      {post.map((item) => (
        <Grid container style={{ justifyContent: 'center' }}>
          <Grid item xs={12} sm={8}>
            <Card key={item._id} style={{ margin: '0', marginBottom: '25px' }}>
              <PostBody post={item} />
            </Card>
          </Grid>
          <Grid item xs={0} sm={4} style={{ overflowY: 'scroll', maxHeight: '87vh' }}>
            <PostContent post={item} />

            <PostFooter post={item} />

            <Comment post={item} />
            <InputComment post={item} />
          </Grid>
        </Grid>
      ))}
    </Box>
  );
}

export default Post;
