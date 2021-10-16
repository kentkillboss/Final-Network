import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles, Typography } from '@material-ui/core';
import CommentDisplay from './CommentDisplay';

Comment.propTypes = {};
const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    // height: 'calc(100vh - 400px)',
    height: '350px',
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
    },
  },
  scroll: {
    flex: 1,
    overflowY: 'overlay',
  },
  seeMore: {
    fontSize: '14px',
    margin: '0 16px',
    cursor: 'pointer',
    fontWeight: 400,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));

function Comment({ post }) {
  const classes = useStyles();
  const [comments, setComments] = useState([]);
  const [showComments, setShowComments] = useState([]);
  const [next, setNext] = useState(2);

  const [replyComments, setReplyComments] = useState([]);

  useEffect(() => {
    const newCm = post.comments.filter((cm) => !cm.reply);
    setComments(newCm);
    setShowComments(newCm.slice(newCm.length - next));
  }, [post.comments, next]);

  useEffect(() => {
    const newRep = post.comments.filter((cm) => cm.reply);
    setReplyComments(newRep);
  }, [post.comments]);
  return (
    <Box className={classes.container}>
      <Box className={classes.scroll}>
        {showComments.map((comment, index) => (
          <CommentDisplay
            key={index}
            comment={comment}
            post={post}
            replyCm={replyComments.filter((item) => item.reply === comment._id)}
          />
        ))}
        {comments.length - next > 0 ? (
          // <Box>
          <Typography onClick={() => setNext(next + 10)} className={classes.seeMore}>
            See more comment
          </Typography>
        ) : (
          // </Box>
          comments.length > 2 && (
            <Typography onClick={() => setNext(2)} className={classes.seeMore}>
              Hide more comment...
            </Typography>
          )
        )}
      </Box>
    </Box>
  );
}

export default Comment;
