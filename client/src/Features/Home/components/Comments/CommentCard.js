import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, Divider, ListItemText, ListItemAvatar, Avatar, Typography } from '@material-ui/core';
import moment from 'moment';
import LikeButton from '../Post/LikeButton';
import CommentMenu from './CommentMenu';
import { useSelector, useDispatch } from 'react-redux';
import { likeComment, unLikeComment, updateComment } from 'Redux/Action/commentAction';
import InputComment from './InputComment';

CommentCard.propTypes = {};
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  fonts: {
    fontWeight: 'bold',
  },
  inline: {
    display: 'inline',
  },
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  listItemAvatar: {
    minWidth: '40px',
  },
  cmtFooter: {
    display: 'flex',
    marginTop: theme.spacing(1),
    width: '108%',
  },
  span: {
    color: 'grey',
    marginLeft: '10px',
    cursor: 'pointer',
    '&:hover': {
      color: 'black',
    },
  },
  listItemText: {
    backgroundColor: '#ece4e4',
    borderRadius: '5px',
    padding: '5px',
  },
  textarea: {
    width: '100%',
    border: 'none',
    outline: 'none',
  },
}));
function CommentCard({ children, comment, post, commentId }) {
  const classes = useStyles();
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [content, setContent] = useState('');
  const [readMore, setReadMore] = useState(false);
  const [isLike, setIsLike] = useState(false);
  const [loadLike, setLoadLike] = useState(false);
  const [onEdit, setOnEdit] = useState(false);
  const [onReply, setOnReply] = useState(false);

  useEffect(() => {
    setContent(comment.content);
    setIsLike(false);
    setOnReply(false);
    if (comment.likes.find((like) => like._id === auth.user._id)) {
      setIsLike(true);
    }
  }, [comment, auth.user._id]);
  const handleLike = async () => {
    if (loadLike) return;
    setIsLike(true);
    setLoadLike(true);
    await dispatch(likeComment({ comment, post, auth }));
    setLoadLike(false);
  };
  const handleUnLike = async () => {
    if (loadLike) return;
    setIsLike(false);
    setLoadLike(true);
    await dispatch(unLikeComment({ comment, post, auth }));
    setLoadLike(false);
  };
  const handleUpdate = () => {
    if (comment.content !== content) {
      dispatch(updateComment({ comment, post, content, auth }));
      setOnEdit(false);
    } else {
      setOnEdit(false);
    }
  };
  const handleReply = () => {
    if (onReply) return setOnReply(false);
    setOnReply({ ...comment, commentId });
  };
  const styleCard = {
    opacity: comment._id ? 1 : 0.5,
    pointerEvent: comment._id ? 'inherit' : 'none',
  };

  return (
    <Box style={styleCard}>
      <List className={classes.root}>
        <ListItem alignItems="flex-start" style={{ display: 'flex' }}>
          <ListItemAvatar className={classes.listItemAvatar}>
            <Avatar alt="avatar" src={comment.user.avatar} className={classes.small} />
          </ListItemAvatar>
          <Box>
            <ListItemText
              className={classes.listItemText}
              primary={<Typography className={classes.fonts}>{comment.user.username}</Typography>}
              secondary={
                <>
                  <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Box style={{ width: '84%' }}>
                      {onEdit ? (
                        <textarea
                          className={classes.textarea}
                          rows="5"
                          value={content}
                          onChange={(e) => setContent(e.target.value)}
                        />
                      ) : (
                        <>
                          {comment.tag && comment.tag._id !== comment.user._id && (
                            <Link to={`/profile/${comment.tag._id}`} style={{ marginRight: '5px' }}>
                              @{comment.tag.username}{' '}
                            </Link>
                          )}

                          <Typography component="span" variant="body2" className={classes.inline} color="textPrimary">
                            {content.length < 100 ? content : readMore ? content + ' ' : content.slice(0, 100) + '....'}
                            {content.length > 100 && (
                              <span className={classes.span} onClick={() => setReadMore(!readMore)}>
                                {readMore ? 'Hide Comment' : 'Show Comment'}
                              </span>
                            )}
                          </Typography>
                        </>
                      )}

                      <Typography className={classes.cmtFooter}>
                        <Typography style={{ fontSize: '13px', marginRight: '10px' }}>
                          {moment(comment.createdAt).fromNow()}
                        </Typography>
                        <Typography style={{ fontSize: '14px', marginRight: '10px', fontWeight: 'bold' }}>
                          {comment.likes.length} likes
                        </Typography>
                        {onEdit ? (
                          <>
                            <Typography
                              onClick={handleUpdate}
                              style={{ fontSize: '14px', marginRight: '10px', fontWeight: 'bold', cursor: 'pointer' }}
                            >
                              Update
                            </Typography>
                            <Typography
                              onClick={() => setOnEdit(false)}
                              style={{ fontSize: '14px', marginRight: '10px', fontWeight: 'bold', cursor: 'pointer' }}
                            >
                              Cancel
                            </Typography>
                          </>
                        ) : (
                          <Typography
                            onClick={handleReply}
                            style={{ fontSize: '14px', marginRight: '10px', fontWeight: 'bold', cursor: 'pointer' }}
                          >
                            {onReply ? 'Cancel' : 'reply'}
                          </Typography>
                        )}
                        {children}
                      </Typography>
                    </Box>
                    <Box style={{ display: 'flex' }}>
                      <LikeButton isLike={isLike} handleLike={handleLike} handleUnLike={handleUnLike} />
                      <CommentMenu post={post} comment={comment} setOnEdit={setOnEdit} />
                    </Box>
                  </Box>
                </>
              }
            />
            {onReply && (
              <InputComment
                post={post}
                onReply={onReply}
                setOnReply={setOnReply}
                tag={onReply.user.username}
                link={onReply.user._id}
              ></InputComment>
            )}
          </Box>
        </ListItem>
      </List>
    </Box>
  );
}

export default CommentCard;
