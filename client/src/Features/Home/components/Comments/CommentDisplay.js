import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CommentCard from './CommentCard';
import { Box, makeStyles, Typography } from '@material-ui/core';

CommentDisplay.propTypes = {};
const useStyles = makeStyles((theme) => ({
  reply: {
    transform: 'translateX(42px)',
    width: '88%',
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

function CommentDisplay({ comment, post, replyCm }) {
  const [showRep, setShowRep] = useState([]);
  const [next, setNext] = useState(1);
  const classes = useStyles();

  useEffect(() => {
    setShowRep(replyCm.slice(replyCm.length - next));
  }, [replyCm, next]);
  return (
    <div>
      <CommentCard comment={comment} post={post} commentId={comment._id} style={{padding: 0}}></CommentCard>
      <Box className={classes.reply}  style={{padding: 0}}>
        {showRep.map(
          (item, index) => item.reply && <CommentCard key={index} comment={item} post={post} commentId={comment._id} />
        )}
        {replyCm.length - next > 0 ? (
          <Typography onClick={() => setNext(next + 10)} className={classes.seeMore}>
            See more comment
          </Typography>
        ) : (
          replyCm.length > 1 && (
            <Typography onClick={() => setNext(1)} className={classes.seeMore}>
              Hide more comment...
            </Typography>
          )
        )}
      </Box>
    </div>
  );
}

export default CommentDisplay;
