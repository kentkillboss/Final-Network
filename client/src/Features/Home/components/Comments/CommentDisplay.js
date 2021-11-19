import { Box, makeStyles, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import CommentCard from './CommentCard';

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
      <CommentCard comment={comment} post={post} commentId={comment._id} style={{ padding: 0 }}></CommentCard>
      <Box className={classes.reply} style={{ padding: 0 }}>
        {showRep.map(
          (item, index) => item.reply && <CommentCard key={index} comment={item} post={post} commentId={comment._id} />
        )}
        {replyCm.length - next > 0 ? (
          <Typography component="span" onClick={() => setNext(next + 10)} className={classes.seeMore}>
            Xem thêm
          </Typography>
        ) : (
          replyCm.length > 1 && (
            <Typography component="span" onClick={() => setNext(1)} className={classes.seeMore}>
              Thu gọn...
            </Typography>
          )
        )}
      </Box>
    </div>
  );
}

export default CommentDisplay;
