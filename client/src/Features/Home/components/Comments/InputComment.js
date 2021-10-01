import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Card, InputAdornment, makeStyles, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { createComment } from 'Redux/Action/commentAction';
import { Link } from 'react-router-dom';
import SendRoundedIcon from '@material-ui/icons/SendRounded';

InputComment.propTypes = {};
const useStyles = makeStyles((theme) => ({
  box: {
    width: '100%',
    display: 'flex',
    padding: theme.spacing(2),
    backgroundColor: '#ece4e4',
    borderRadius: '5px',
  },
  textfield: {
    width: '90%',
    height: '90%',
  },
  btnSubmit: {},
  hr: {
    border: '0.5px solid #f8efef',
  },
}));

function InputComment({ children, post, onReply, setOnReply, tag, link }) {
  const classes = useStyles();
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [content, setContent] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!content.trim()) {
      if (setOnReply) return setOnReply(false);
    }
    setContent('');
    const newComment = {
      content,
      likes: [],
      user: auth.user,
      createdAt: new Date().toISOString(),
      reply: onReply && onReply.commentId,
      tag: onReply && onReply.user,
    };

    dispatch(createComment({ post, newComment, auth }));
    if (setOnReply) return setOnReply(false);
  };
  return (
    <form onSubmit={handleSubmit}>
      {children}
      <hr className={classes.hr}></hr>
      <Box className={classes.box}>
        {tag ? (
          <TextField
            size="small"
            className={classes.textfield}
            // variant="none"
            type="text"
            placeholder="Add your cmt..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Link to={`/profile/${link}`}>{`@${tag}:`}</Link>
                </InputAdornment>
              ),
            }}
          />
        ) : (
          <TextField
            size="small"
            className={classes.textfield}
            // variant="none"
            type="text"
            placeholder="Add your cmt..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        )}

        <Button className={classes.btnSubmit} type="submit" color="primary">
          <SendRoundedIcon />
        </Button>
      </Box>
    </form>
  );
}

export default InputComment;
