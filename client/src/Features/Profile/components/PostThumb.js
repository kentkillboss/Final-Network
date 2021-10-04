import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import InfoIcon from '@material-ui/icons/Info';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import ChatBubbleOutlineRoundedIcon from '@material-ui/icons/ChatBubbleOutlineRounded';
import 'Features/Discover/hover.scss';

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
      <img src={posts.images[0].url} alt={posts.images[0].url} />

      <div className="photo__overlay">
        <div className="photo__actions">
          <div>
            <FavoriteBorderRoundedIcon fontSize="large" />
            {posts.likes.length}
          </div>

          <div>
            <ChatBubbleOutlineRoundedIcon fontSize="large" />
            {posts.comments.length}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostThumb;
