import { CardActions, IconButton, Typography } from '@material-ui/core';
import BookmarksRoundedIcon from '@material-ui/icons/BookmarksRounded';
import ChatBubbleOutlineRoundedIcon from '@material-ui/icons/ChatBubbleOutlineRounded';
import ShareIcon from '@material-ui/icons/Share';
import TurnedInNotRoundedIcon from '@material-ui/icons/TurnedInNotRounded';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { likePost, savePost, unLikePost, unSavePost } from 'Redux/Action/postAction';
import { BASE_URL } from 'utils/config';
import LikeButton from './LikeButton';
import ShareModal from './ShareModal';

PostFooter.propTypes = {};

function PostFooter({ post }) {
  const { auth, socket, theme } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [isLike, setIsLike] = useState(false);
  const [loadLike, setLoadLike] = useState(false);
  const [isShare, setIsShare] = useState(false);

  const [saved, setSaved] = useState(false);
  const [saveLoad, setSaveLoad] = useState(false);

  useEffect(() => {
    if (post.likes.find((like) => like._id === auth.user._id)) {
      setIsLike(true);
    } else {
      setIsLike(false);
    }
  }, [post.likes, auth.user._id]);

  const handleLike = async () => {
    if (loadLike) return;

    setLoadLike(true);
    await dispatch(likePost({ post, auth, socket }));
    setLoadLike(false);
  };
  const handleUnLike = async () => {
    if (loadLike) return;

    setLoadLike(true);
    await dispatch(unLikePost({ post, auth, socket }));
    setLoadLike(false);
  };

  useEffect(() => {
    if (auth.user.saved.find((id) => id === post._id)) {
      setSaved(true);
    } else {
      setSaved(false);
    }
  }, [auth.user.saved, post._id]);

  const handleSavePosts = async () => {
    if (saveLoad) return;

    setSaveLoad(true);
    await dispatch(savePost({ post, auth }));
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
          <LikeButton isLike={isLike} handleLike={handleLike} handleUnLike={handleUnLike} theme={theme} />
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
          {saved ? (
            <BookmarksRoundedIcon
              style={{ color: 'rgb(63, 81, 181)', filter: theme ? 'invert(1)' : 'invert(0)' }}
              onClick={handleUnSavePosts}
            />
          ) : (
            <TurnedInNotRoundedIcon onClick={handleSavePosts} />
          )}
        </IconButton>
      </CardActions>
      <CardActions style={{ padding: '0 16px' }}>
        <Typography>{post.likes.length} Thích</Typography>
        <Typography style={{ marginLeft: 'auto' }}>{post.comments.length} Bình luận</Typography>
      </CardActions>
      {isShare && <ShareModal url={`${BASE_URL}/post/${post._id}`} setIsShare={setIsShare} />}
    </>
  );
}

export default PostFooter;
