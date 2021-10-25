import { Avatar, Box, Button, IconButton, InputAdornment, makeStyles, TextField } from '@material-ui/core';
import EmojiEmotionsRoundedIcon from '@material-ui/icons/EmojiEmotionsRounded';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import Icons from 'Components/Icons';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createComment } from 'Redux/Action/commentAction';

InputComment.propTypes = {};
const useStyles = makeStyles((theme) => ({
  box: {
    width: '100%',
    display: 'flex',
    padding: '3px',
    backgroundColor: '#f0f2f5',
    borderRadius: '51px',
    marginBottom: '10px',
  },
  textfield: {
    width: '82%',
    height: '90%',
    margin: 'auto',
    color: 'white'
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
  const { auth, socket, theme } = useSelector((state) => state);
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
        <Avatar
          src={auth.user.avatar}
          style={{ marginLeft: '-8px', marginRight: '6px', filter: theme ? 'invert(1)' : 'invert(0)' }}
        />
        <Box className={classes.box} style={{ backgroundColor: theme ? '#c5c4c3' : '#f0f2f5' }}>
          {tag ? (
            <TextField
            style={{filter: theme ? 'invert(1)' : 'invert(0)'}}
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
            style={{filter: theme ? 'invert(1)' : 'invert(0)'}}
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

          <Button
            className={classes.btnSubmit}
            type="submit"
            color="primary"
            style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}
          >
            <SendRoundedIcon />
          </Button>
        </Box>
      </Box>
      {showIcon && <Icons setShowIcon={setShowIcon} setContent={setContent} content={content} />}
    </form>
  );
}

export default InputComment;
