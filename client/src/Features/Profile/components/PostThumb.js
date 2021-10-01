import React from 'react';
import PropTypes from 'prop-types';
import { Box, IconButton, ImageList, ImageListItem, ImageListItemBar, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import InfoIcon from '@material-ui/icons/Info';

PostThumb.propTypes = {};
const useStyles = makeStyles((theme) => ({
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
}));

function PostThumb({ posts, result }) {
  const classes = useStyles();
  if (result === 0) return <h2>No Post</h2>;
  return (
    <Box className={classes.root}>
      <ImageList rowHeight={180} cols={4}>
        {posts.map((post) => (
          <ImageListItem key={post._id}>
            <img src={post.images[0].url} alt={post.images[0].url} />
            <Link to={`/post/${post._id}`}>
              <ImageListItemBar
                title={post.likes.length}
                subtitle={<span>by: {post.comments.length}</span>}
                actionIcon={
                  <IconButton aria-label={`info about ${post.title}`} className={classes.icon}>
                    <InfoIcon />
                  </IconButton>
                }
              />
            </Link>
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

export default PostThumb;
