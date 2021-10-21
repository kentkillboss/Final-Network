import { Box, CardHeader, IconButton, makeStyles, Typography } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import FileCopyRoundedIcon from '@material-ui/icons/FileCopyRounded';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import moment from 'moment';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { GLOBALTYPES } from 'Redux/Action/globalTypes';
import { deletePost, reportPost } from 'Redux/Action/postAction';
import { BASE_URL } from 'utils/config';
import ReportIcon from '@material-ui/icons/Report';

PostContent.propTypes = {};
const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  title: {
    textDecoration: 'none',
    color: 'black',
    fontSize: '17px',
    fontWeight: 450,
  },
  cardheader: {
    padding: '0 0 16px 0 ',
  },
  hr: {
    border: '0.5px solid #ebdfdf',
    width: '93%',
  },
  readMore: {
    cursor: 'pointer',
    fontWeight: 400,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
}));
function PostContent({ post }) {
  const classes = useStyles();
  const { auth, socket } = useSelector((state) => state);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleEditPost = () => {
    dispatch({ type: GLOBALTYPES.STATUS, payload: { ...post, onEdit: true } });
  };
  const handleDeletePost = () => {
    if (window.confirm('Bạn chắc chắn muốn xoá bài viết này?')) {
      dispatch(deletePost({ post, auth, socket }));
      history.push('/');
    }
  };
  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${BASE_URL}/post/${post._id}`);
    setAnchorEl(null);
  };
  const handleReportPost = async () => {
    if (window.confirm('Bạn chắc chắn muốn báo cáo bài viết này?')) {
      await dispatch(reportPost({ post, auth }));
      handleClose();
      history.push('/');
    }
  }

  const [readMore, setReadMore] = useState(false);
  return (
    <>
      <CardContent style={{ paddingBottom: '16px' }}>
        <CardHeader
          className={classes.cardheader}
          avatar={
            <Link to={`/profile/${post.user._id}`}>
              <Avatar src={post.user.avatar} className={classes.avatar} />{' '}
            </Link>
          }
          action={
            <IconButton onClick={handleClick} aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={
            <Link className={classes.title} to={`/profile/${post.user._id}`}>
              {post.user.username}
            </Link>
          }
          subheader={moment(post.createdAt).fromNow()}
        />
        <Typography variant="body1" component="p">
          {post.content.length < 60
            ? post.content
            : readMore
            ? post.content + ' '
            : post.content.slice(0, 60) + ' ....'}
        </Typography>
        {post.content.length > 60 && (
          <Typography
            color="textSecondary"
            variant="subtitle1"
            onClick={() => setReadMore(!readMore)}
            className={classes.readMore}
          >
            {readMore ? 'Hide content' : 'Read more'}
          </Typography>
        )}
      </CardContent>
      <hr className={classes.hr}></hr>

      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        {auth.user._id === post.user._id && (
          <Box>
            <MenuItem onClick={handleEditPost}>
              <EditRoundedIcon className={classes.icon} /> Edit
            </MenuItem>
            <MenuItem onClick={handleDeletePost}>
              <DeleteRoundedIcon className={classes.icon} />
              Delete
            </MenuItem>
          </Box>
        )}
        <MenuItem onClick={handleCopyLink}>
          <FileCopyRoundedIcon className={classes.icon} />
          Copy Link
        </MenuItem>
        <MenuItem onClick={handleReportPost}>
          <ReportIcon className={classes.icon} />
          Report this post
        </MenuItem>
      </Menu>
    </>
  );
}

export default PostContent;
