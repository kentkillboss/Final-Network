import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { likeComment, unLikeComment, updateComment } from 'Redux/Action/commentAction';
import LikeButton from '../Post/LikeButton';
import CommentMenu from './CommentMenu';
import InputComment from './InputComment';

CommentCard.propTypes = {};
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    padding: 0,
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
    width: '108%',
  },
  typo: {
    fontSize: '14px',
    marginRight: '10px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '10px',
      marginRight: '5px',
    },
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
    backgroundColor: '#f0f2f5',
    borderRadius: '10px',
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
  const { auth, theme } = useSelector((state) => state);
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
      <List className={classes.root} style={{ backgroundColor: theme ? '#dbdad9' : '#ffffff' }}>
        <ListItem alignItems="flex-start" style={{ display: 'flex' }}>
          <Link to={`/profile/${comment.user._id}`}>
            <ListItemAvatar className={classes.listItemAvatar}>
              <Avatar
                alt="avatar"
                src={comment.user.avatar}
                className={classes.small}
                style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}
              />
            </ListItemAvatar>
          </Link>
          <Box>
            <ListItemText
              style={{ backgroundColor: theme ? '#c5c4c3' : '#f0f2f5' }}
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

                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                            style={{ filter: theme ? 'invert(1)' : 'invert(0)', color: theme ? 'white' : 'black' }}
                          >
                            {content.length < 100 ? content : readMore ? content + ' ' : content.slice(0, 100) + '....'}
                            {content.length > 100 && (
                              <span className={classes.span} onClick={() => setReadMore(!readMore)}>
                                {readMore ? 'Xem thêm' : 'Thu gọn'}
                              </span>
                            )}
                          </Typography>
                        </>
                      )}

                      <Typography className={classes.cmtFooter}>
                        <Typography className={classes.typo}>{moment(comment.createdAt).fromNow()}</Typography>
                        <Typography className={classes.typo} style={{ fontWeight: 'bold' }}>
                          {comment.likes.length} Thích
                        </Typography>
                        {onEdit ? (
                          <>
                            <Typography
                              className={classes.typo}
                              onClick={handleUpdate}
                              style={{ fontWeight: 'bold', cursor: 'pointer' }}
                            >
                              Sửa
                            </Typography>
                            <Typography
                              className={classes.typo}
                              onClick={() => setOnEdit(false)}
                              style={{ fontWeight: 'bold', cursor: 'pointer' }}
                            >
                              Hủy
                            </Typography>
                          </>
                        ) : (
                          <Typography
                            className={classes.typo}
                            onClick={handleReply}
                            style={{ fontWeight: 'bold', cursor: 'pointer' }}
                          >
                            {onReply ? 'Hủy' : 'Trả lời'}
                          </Typography>
                        )}
                        {children}
                      </Typography>
                    </Box>
                    <Box style={{ display: 'flex' }}>
                      <LikeButton isLike={isLike} handleLike={handleLike} handleUnLike={handleUnLike} theme={theme} />
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
