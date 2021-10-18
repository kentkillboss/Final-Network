import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'Components/Avatar/Avatar';
import { makeStyles } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

SearchCardMessage.propTypes = {
  user: PropTypes.object,
};

const useStyles = makeStyles((theme) => ({
  user: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
  },
  root: {
    maxWidth: 500,
    width: '80%',
    marginLeft: '8%',
    backgroundColor: theme.palette.grey[100],
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
    borderRadius: '4px',
    zIndex: '1000',
  },
  listitemtext: {
    color: 'black',
    cursor: 'pointer',
  },
}));

function SearchCardMessage({ user }) {
  const classes = useStyles();

  return (
    <>
      <List className={classes.root}>
        <ListItem button>
          <ListItemAvatar>
            <Avatar src={user.avatar} size={classes.user} />
          </ListItemAvatar>
          <ListItemText className={classes.listitemtext} primary={user.username} secondary={user.fullname} />
        </ListItem>
      </List>
    </>
  );
}

export default SearchCardMessage;
