import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { CardActions, IconButton, Typography } from '@material-ui/core';
import ShareIcon from '@material-ui/icons/Share';
import BookmarksRoundedIcon from '@material-ui/icons/BookmarksRounded';
import ChatBubbleOutlineRoundedIcon from '@material-ui/icons/ChatBubbleOutlineRounded';
import LikeButton from './LikeButton';
import { useDispatch, useSelector } from 'react-redux';
import { likePost, unLikePost } from 'Redux/Action/postAction';

PostFooter.propTypes = {};

function PostFooter({ post }) {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [isLike, setIsLike] = useState(false);
  const [loadLike, setLoadLike] = useState(false);

  useEffect(() => {
    if (post.likes.find((like) => like._id === auth.user._id)) {
      setIsLike(true);
    }
  }, [post.likes, auth.user._id]);

  const handleLike = async () => {
    if (loadLike) return;
    setIsLike(true);
    setLoadLike(true);
    await dispatch(likePost({ post, auth }));
    setLoadLike(false);
  };
  const handleUnLike = async () => {
    if (loadLike) return;
    setIsLike(false);
    setLoadLike(true);
    await dispatch(unLikePost({ post, auth }));
    setLoadLike(false);
  };
  return (
    <>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <LikeButton isLike={isLike} handleLike={handleLike} handleUnLike={handleUnLike} />
        </IconButton>
        <Link to={`/post/${post._id}`}>
          <IconButton aria-label="add to favorites">
            <ChatBubbleOutlineRoundedIcon />
          </IconButton>
        </Link>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton style={{ marginLeft: 'auto' }}>
          <BookmarksRoundedIcon />
        </IconButton>
      </CardActions>
      <CardActions style={{ padding: '0 16px' }}>
        <Typography>{post.likes.length} Like</Typography>
        <Typography style={{ marginLeft: 'auto' }}>{post.comments.length} Comments</Typography>
      </CardActions>
    </>
  );
}

export default PostFooter;
