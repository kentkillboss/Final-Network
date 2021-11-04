import React from 'react';
import PropTypes from 'prop-types';
import Avatar from 'Components/Avatar/Avatar';
import { makeStyles } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { useHistory } from 'react-router';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

SearchCard.propTypes = {
  search: PropTypes.object,
  user: PropTypes.object,
  onSubmit: PropTypes.func,
};

const useStyles = makeStyles((theme) => ({
  user: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
  },
  root: {
    width: '100%',
    maxWidth: 400,
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

function SearchCard({ user, onSubmit, search, load }) {
  const classes = useStyles();
  const history = useHistory();
  const handleClick = (id) => {
    history.push(`/profile/${id}`);
    onSubmit();
  };
  return (
    <>
      <List className={classes.root}>
        <ListItem style={{ borderBottom: '1px solid gray' }}>
          {load ? (
            <CircularProgress style={{ width: '20px', height: '20px', color: '#f50057' }} />
          ) : (
            <SearchRoundedIcon color="secondary" style={{ marginRight: '5px' }} />
          )}
          <Typography color="secondary">Tìm '{search}'</Typography>
        </ListItem>
        {search &&
          user.map((user) => (
            <>
              <ListItem onClick={() => handleClick(user._id)} button>
                <ListItemAvatar>
                  <Avatar src={user.avatar} size={classes.user} />
                </ListItemAvatar>
                <ListItemText className={classes.listitemtext} primary={user.username} secondary={user.fullname} />
              </ListItem>
            </>
          ))}
      </List>
    </>
  );
}

export default SearchCard;
