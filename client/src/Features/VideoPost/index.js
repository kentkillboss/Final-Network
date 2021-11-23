import { Box, Card, Grid, makeStyles } from '@material-ui/core';
import { getDataAPI } from 'api/fetchData';
import PostLoading from 'Components/Loading/SkeletonPost';
import CommentHome from 'Features/Home/components/Comments/CommentHome';
import InputComment from 'Features/Home/components/Comments/InputComment';
import LeftBar from 'Features/Home/components/LeftBar';
import PostBodyHome from 'Features/Home/components/Post/PostBodyHome';
import PostContent from 'Features/Home/components/Post/PostContent';
import PostFooter from 'Features/Home/components/Post/PostFooter';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';
import { POST_TYPES } from 'Redux/Action/postAction';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 2px 5px',
  },
  box: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  bookmark: {
    display: 'block',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));

function VideoPosts(props) {
  const classes = useStyles();
  const { auth, posts, theme } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const [video, setVideo] = useState([]);

  useEffect(() => {
    const newPost = posts.rpPosts.filter((post) => post.images[0].url.match(/video/i));
    setVideo(newPost);
  }, [posts.rpPosts]);

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(`getAllPosts?limit=${posts.rpPage * 3}`, auth.token);
    dispatch({ type: POST_TYPES.GET_ALL_POSTS, payload: { ...res.data, rpPage: posts.rpPage + 1 } });
    setLoad(false);
  };

  return (
    <div>
      <Grid container>
        <Grid className={classes.bookmark} item xs={0} sm={3}>
          <LeftBar />
        </Grid>
        <Grid item xs={0} sm={0} style={{ display: 'block', backgroundColor: theme ? '#e7e6e5' : '#f0f2f5' }}></Grid>
        <Grid item xs={12} sm={8} style={{ display: 'block', backgroundColor: theme ? '#dbdad9' : '#f0f2f5' }}>
          {posts.loading ? (
            <PostLoading />
          ) : video.length === 0 ? (
            <h2>No Post</h2>
          ) : (
            <Box className={classes.box}>
              <InfiniteScroll
                dataLength={video.length} //This is important field to render the next data
                next={handleLoadMore}
                hasMore={true}
                loader={''}
                endMessage={<h1>End</h1>}
              >
                {video.map((post) => (
                  <Card
                    key={post._id}
                    className={classes.root}
                    style={{ margin: '0', marginBottom: '25px', backgroundColor: theme ? '#dbdad9' : '#ffffff' }}
                  >
                    <PostContent post={post} />
                    <PostBodyHome post={post} />
                    <PostFooter post={post} />

                    <CommentHome post={post} />
                    <InputComment post={post} />
                  </Card>
                ))}
              </InfiniteScroll>
              {load && <PostLoading />}
            </Box>
          )}
        </Grid>
        <Grid item xs={1} sm={1} style={{ backgroundColor: theme ? '#e7e6e5' : '#f0f2f5' }}></Grid>
      </Grid>
    </div>
  );
}

export default VideoPosts;
