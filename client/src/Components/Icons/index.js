import { Box, makeStyles } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  popoverPaper: {
    width: '14%',
    maxHeight: 'unset',
    maxWidth: 'unset',
    [theme.breakpoints.down('sm')]: {
      width: '31%',
    },
  },
  span: {
    fontSize: '20px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '15px',
    },
    '&:hover': {
      backgroundColor: 'grey',
      cursor: 'pointer',
    },
  },
}));

function Icons({ showIcon, setShowIcon, setContent, content }) {
  const classes = useStyles();
  const reactions = [
    '🙂',
    '😀',
    '😄',
    '😆',
    '😅',
    '😂',
    '🤣',
    '😊',
    '😌',
    '😉',
    '😏',
    '😍',
    '😘',
    '😗',
    '😙',
    '😚',
    '🤗',
    '😳',
    '🙃',
    '😇',
    '😈',
    '😛',
    '😝',
    '😜',
    '😋',
    '🤤',
    '🤓',
    '😎',
    '🤑',
    '😒',
    '🙁',
    '😞',
    '😔',
    '😖',
    '😓',
    '😢',
    '😢',
    '😭',
    '😟',
    '😣',
    '😩',
    '😫',
    '😕',
    '🤔',
    '🙄',
    '😤',
    '😠',
    '😡',
    '🌚',
  ];

  const handleClose = () => {
    setShowIcon(false);
  };
  return (
    <div style={{ width: '500px' }}>
      <Menu
        id="simple-menu"
        anchorEl={showIcon}
        keepMounted
        open={Boolean(showIcon)}
        onClose={handleClose}
        PopoverClasses={{ paper: classes.popoverPaper }}
      >
        <Box style={{ maxHeight: '166px' }}>
          {reactions.map((icon) => (
            <span className={classes.span} key={icon} onClick={() => setContent(content + icon)}>
              {icon}
            </span>
          ))}
        </Box>
      </Menu>
    </div>
  );
}

export default Icons;