import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, Button, Card, IconButton, InputAdornment, makeStyles, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { createComment } from 'Redux/Action/commentAction';
import { Link } from 'react-router-dom';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import EmojiEmotionsRoundedIcon from '@material-ui/icons/EmojiEmotionsRounded';
import Icons from 'Components/Icons';

InputComment.propTypes = {};
const useStyles = makeStyles((theme) => ({
  box: {
    width: '100%',
    display: 'flex',
    padding: '3px',
    backgroundColor: '#f0f2f5',
    borderRadius: '51px',
    marginBottom: '10px',
    // justifyContent: 'center',
  },
  textfield: {
    width: '82%',
    height: '90%',
    margin: 'auto',
  },
  btnSubmit: {},
  hr: {
    border: '0.5px solid #ebdfdf',
  },
  form: {
    width: '91%',
    margin: 'auto',
  },
}));

function InputComment({ children, post, onReply, setOnReply, tag, link }) {
  const classes = useStyles();
  const { auth, socket } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [content, setContent] = useState('');
  const [showIcon, setShowIcon] = useState(false);
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

    dispatch(createComment({ post, newComment, auth, socket }));
    if (setOnReply) return setOnReply(false);
  };
  return (
    <form onSubmit={handleSubmit} className={classes.form}>
      {children}
      <hr className={classes.hr}></hr>
      <Box style={{ display: 'flex' }}>
        <Avatar src={auth.user.avatar} style={{ marginLeft: '-8px', marginRight: '6px' }} />
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
          <IconButton onClick={() => setShowIcon(true)} size="small">
            <EmojiEmotionsRoundedIcon />
          </IconButton>

          <Button className={classes.btnSubmit} type="submit" color="primary">
            <SendRoundedIcon />
          </Button>
        </Box>
      </Box>
      {showIcon && <Icons setShowIcon={setShowIcon} setContent={setContent} content={content} />}
    </form>
  );
}

export default InputComment;
