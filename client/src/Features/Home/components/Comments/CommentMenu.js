import { Box, makeStyles, Menu, MenuItem } from '@material-ui/core';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteComment } from 'Redux/Action/commentAction';

CommentMenu.propTypes = {};
const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
}));
function CommentMenu({ post, comment, setOnEdit }) {
  const classes = useStyles();
  const { auth, socket } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleRemove = () => {
    if (post.user._id === auth.user._id || comment.user._id === auth.user._id) {
      dispatch(deleteComment({ post, auth, comment, socket }));
    }

    setAnchorEl(null);
  };
  return (
    <>
      {(post.user._id === auth.user._id || comment.user._id === auth.user._id) && (
        <Box>
          <MoreVertIcon onClick={handleClick} style={{ cursor: 'pointer' }} />
          <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
            {post.user._id === auth.user._id ? (
              comment.user._id === auth.user._id ? (
                <Box>
                  <MenuItem onClick={() => setOnEdit(true)}>
                    <EditRoundedIcon className={classes.icon} /> Chỉnh sửa
                  </MenuItem>
                  <MenuItem onClick={handleRemove}>
                    <DeleteRoundedIcon className={classes.icon} />
                    Xóa
                  </MenuItem>
                </Box>
              ) : (
                <MenuItem onClick={handleRemove}>
                  <DeleteRoundedIcon className={classes.icon} />
                  Xóa
                </MenuItem>
              )
            ) : (
              comment.user._id === auth.user._id && (
                <Box>
                  <MenuItem onClick={() => setOnEdit(true)}>
                    <EditRoundedIcon className={classes.icon} /> Chỉnh sửa
                  </MenuItem>
                  <MenuItem onClick={handleRemove}>
                    <DeleteRoundedIcon className={classes.icon} />
                    Xóa
                  </MenuItem>
                </Box>
              )
            )}
          </Menu>
        </Box>
      )}
    </>
  );
}

export default CommentMenu;
