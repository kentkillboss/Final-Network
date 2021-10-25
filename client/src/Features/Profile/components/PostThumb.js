import ChatBubbleOutlineRoundedIcon from '@material-ui/icons/ChatBubbleOutlineRounded';
import FavoriteBorderRoundedIcon from '@material-ui/icons/FavoriteBorderRounded';
import 'Features/Discover/hover.scss';
import React from 'react';
import { useSelector } from 'react-redux';

PostThumb.propTypes = {};

function PostThumb({ posts, result }) {
  const {theme} = useSelector(state => state);
  if (result === 0) return <h2>No Post</h2>;
  return (
    <div className="photo">
      {posts.images[0].url.match(/video/i) ? (
        <video width="100%" controls src={posts.images[0].url} style={{ filter: theme ? 'invert(1)' : 'invert(0)' }} />
      ) : (
        <img src={posts.images[0].url} alt={posts.images[0].url} style={{ filter: theme ? 'invert(1)' : 'invert(0)' }} />
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
