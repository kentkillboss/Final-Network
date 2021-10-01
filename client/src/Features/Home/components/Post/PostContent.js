import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Box, CardHeader, IconButton, makeStyles } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import moment from 'moment';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import FileCopyRoundedIcon from '@material-ui/icons/FileCopyRounded';
import { GLOBALTYPES } from 'Redux/Action/globalTypes';
import StatusModal from '../Status/StatusModal';

PostContent.propTypes = {};
const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
}));
function PostContent({ post }) {
  const classes = useStyles();
  const { auth } = useSelector((state) => state);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleEditPost = () => {
    dispatch({ type: GLOBALTYPES.STATUS, payload: { ...post, onEdit: true } });
  };
  return (
    <>
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

      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        {auth.user._id === post.user._id && (
          <Box>
            <MenuItem onClick={handleEditPost}>
              <EditRoundedIcon className={classes.icon} /> Edit
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <DeleteRoundedIcon className={classes.icon} />
              Delete
            </MenuItem>
          </Box>
        )}
        <MenuItem onClick={handleClose}>
          <FileCopyRoundedIcon className={classes.icon} />
          Copy Link
        </MenuItem>
      </Menu>
    </>
  );
}

export default PostContent;
