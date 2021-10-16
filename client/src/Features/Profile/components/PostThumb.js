import { makeStyles } from '@material-ui/core';
import ChatBubbleOutlineRoundedIcon from '@material-ui/icons/ChatBubbleOutlineRounded';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import 'Features/Discover/hover.scss';
import React from 'react';

PostThumb.propTypes = {};
const useStyles = makeStyles((theme) => ({
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  },
  img: {
    width: '90%',
    height: '90%',
  },
  root: {
    width: '100%',
    height: '200px',
  },
}));

function PostThumb({ posts, result }) {
  const classes = useStyles();
  if (result === 0) return <h2>No Post</h2>;
  return (
    <div className="photo">
      {posts.images[0].url.match(/video/i) ? (
        <video width="100%" controls src={posts.images[0].url} />
      ) : (
        <img src={posts.images[0].url} alt={posts.images[0].url} />
      )}

      <div className="photo__overlay">
        <div className="photo__actions">
          <div className="photo__icon">
            <FavoriteBorderRoundedIcon fontSize="large" />
            <p>{posts.likes.length}</p>
            
          </div>

          <div className="photo__icon">
            <ChatBubbleOutlineRoundedIcon fontSize="large" />
            <p>{posts.comments.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostThumb;
