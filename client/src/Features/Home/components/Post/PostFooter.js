import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { CardActions, IconButton, Typography } from '@material-ui/core';
import ShareIcon from '@material-ui/icons/Share';
import BookmarksRoundedIcon from '@material-ui/icons/BookmarksRounded';
import ChatBubbleOutlineRoundedIcon from '@material-ui/icons/ChatBubbleOutlineRounded';
import LikeButton from './LikeButton';
import { useDispatch, useSelector } from 'react-redux';
import { likePost, savePost, unLikePost, unSavePost } from 'Redux/Action/postAction';
import ShareModal from './ShareModal';
import { BASE_URL } from 'utils/config';
import TurnedInNotRoundedIcon from '@material-ui/icons/TurnedInNotRounded';
import TurnedInRoundedIcon from '@material-ui/icons/TurnedInRounded';

PostFooter.propTypes = {};

function PostFooter({ post }) {
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [isLike, setIsLike] = useState(false);
  const [loadLike, setLoadLike] = useState(false);
  const [isShare, setIsShare] = useState(false);

  const [saved, setSaved] = useState(false);
  const [saveLoad, setSaveLoad] = useState(false);

  useEffect(() => {
    if (post.likes.find((like) => like._id === auth.user._id)) {
      setIsLike(true);
    }else{
      setIsLike(false)
    }
  }, [post.likes, auth.user._id]);

  const handleLike = async () => {
    if (loadLike) return;
    
    setLoadLike(true);
    await dispatch(likePost({ post, auth }));
    setLoadLike(false);
  };
  const handleUnLike = async () => {
    if (loadLike) return;
    
    setLoadLike(true);
    await dispatch(unLikePost({ post, auth }));
    setLoadLike(false);
  };

  useEffect(() => {
    if (auth.user.saved.find((id) => id === post._id)) {
      setSaved(true);
    }else{
      setSaved(false);
    }
  }, [auth.user.saved, post._id]);

  const handleSavePosts = async () => {
    if (saveLoad) return;
    
    setSaveLoad(true);
    await dispatch(savePost({post, auth}));
    setSaveLoad(false);
  };

  const handleUnSavePosts = async () => {
    if (saveLoad) return;
    
    setSaveLoad(true);
    await dispatch(unSavePost({ post, auth }));
    setSaveLoad(false);
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
        <IconButton aria-label="share" onClick={() => setIsShare(true)}>
          <ShareIcon />
        </IconButton>
        <IconButton style={{ marginLeft: 'auto' }}>
          {
            saved 
            ? <BookmarksRoundedIcon style={{color: 'rgb(63, 81, 181)'}} onClick={handleUnSavePosts} />
            : <TurnedInNotRoundedIcon onClick={handleSavePosts} />
          }
          
        </IconButton>
      </CardActions>
      <CardActions style={{ padding: '0 16px' }}>
        <Typography>{post.likes.length} Like</Typography>
        <Typography style={{ marginLeft: 'auto' }}>{post.comments.length} Comments</Typography>
      </CardActions>
      {isShare && <ShareModal url={`${BASE_URL}/post/${post._id}`} setIsShare={setIsShare} />}
    </>
  );
}

export default PostFooter;
