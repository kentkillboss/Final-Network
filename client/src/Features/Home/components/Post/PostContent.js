import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Box, CardHeader, IconButton, makeStyles, Typography } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import moment from 'moment';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import FileCopyRoundedIcon from '@material-ui/icons/FileCopyRounded';
import { GLOBALTYPES } from 'Redux/Action/globalTypes';
import StatusModal from '../Status/StatusModal';
import { deletePost } from 'Redux/Action/postAction';
import { BASE_URL } from 'utils/config';
import CardContent from '@material-ui/core/CardContent';

PostContent.propTypes = {};
const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
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
    if (window.confirm('Are you sure want to delete this post?')) {
      dispatch(deletePost({ post, auth, socket }));
      history.push('/');
    }
  };
  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${BASE_URL}/post/${post._id}`);
    setAnchorEl(null);
  };

  const [readMore, setReadMore] = useState(false);
  return (
    <>
      <CardContent className={classes.content}>
        <CardHeader
          avatar={<Avatar src={post.user.avatar} className={classes.avatar} />}
          action={
            <IconButton onClick={handleClick} aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={<Link to={`/profile/${post.user._id}`}>{post.user.username}</Link>}
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
            <Typography color="textSecondary" variant="subtitle1" onClick={() => setReadMore(!readMore)}>
              {readMore ? 'Hide content' : 'Read more'}
            </Typography>
          )}
      </CardContent>

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
      </Menu>
    </>
  );
}

export default PostContent;
