import {
  FormControl,
  InputAdornment,
  InputLabel,
  ListItemSecondaryAction,
  OutlinedInput,
  Typography,
} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import SearchIcon from '@material-ui/icons/Search';
import { getDataAPI } from 'api/fetchData';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { GLOBALTYPES } from 'Redux/Action/globalTypes';
import { addUser } from 'Redux/Action/messageAction';
import { Box, ClickAwayListener } from '@material-ui/core';
import moment from 'moment';
import UseCard from '../UseCard';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 'calc(100vh - 85px)',
    borderRight: '1px solid grey',
    paddingTop: '20px',
  },
  listItem: {
    width: '98%',
    backgroundColor: theme.palette.background.paper,
    marginTop: '5px',
    marginLeft: '2%',
  },
  searchBtn: {
    display: 'none',
  },
  search: {
    width: '80%',
    marginLeft: '8%',
    background: '#ffffff',
    borderRadius: '15px',
    height: '45px',
  },
  online: {
    position: 'absolute',
    top: '50%',
    right: '10px',
  },
}));

function LeftSide(props) {
  const classes = useStyles();

  const [search, setSearch] = useState();
  const [searchUsers, setSearchUsers] = useState([]);
  const { auth, message } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) return setSearchUsers([]);

    try {
      const res = await getDataAPI(`search?username=${search}`, auth.token);
      setSearchUsers(res.data.users);
    } catch (err) {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } });
    }
  };

  const handleAddUser = (user) => {
    setSearch('');
    setSearchUsers([]);
    dispatch(addUser({ user, message }));
    return history.push(`/message/${user._id}`);
  };

  return (
    <Box className={classes.root}>
      <form onSubmit={handleSearch}>
        <FormControl fullWidth variant="outlined">
          <InputLabel
            htmlFor="outlined-adornment-amount"
            style={{ fontWeight: 'bold', fontSize: '14px', paddingLeft: '50px', paddingTop: '3px' }}
          >
            Enter để tìm kiếm
          </InputLabel>
          <OutlinedInput
            className={classes.search}
            id="outlined-adornment-amount"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            labelWidth={120}
          />
        </FormControl>
        <button className={classes.searchBtn} type="submit">
          Search{' '}
        </button>
      </form>
      <List component="nav" className={classes.listItem}>
        {searchUsers.length !== 0 ? (
          <>
            {searchUsers.map((user) => (
              <ListItem button key={user._id} onClick={() => handleAddUser(user)}>
                <ListItemAvatar>
                  <Avatar src={user.avatar}></Avatar>
                </ListItemAvatar>
                <ListItemText primary={user.username} secondary={user.fullname} />
              </ListItem>
            ))}
          </>
        ) : (
          <>
            {message.users.map((user) => (
              // <ListItem button selected={isSelected(user)} onClick={() => handleAddUser(user)}>
              //   <ListItemAvatar>
              //     <Avatar src={user.avatar}></Avatar>
              //   </ListItemAvatar>
              //   <ListItemText primary={user.username} secondary={user.fullname} />

              //   <ListItemText
              //     primary={
              //       <Box style={{ textAlign: 'right', color: ' grey', fontSize: '13px' }}>
              //         {moment(message.createdAt).fromNow()}
              //       </Box>
              //     }
              //     secondary={
              //       <Box style={{ textAlign: 'right' }}>
              //         <FiberManualRecordIcon style={{ fontSize: '14px' }} />
              //       </Box>
              //     }
              //   />
              // </ListItem>
              <Box key={user._id} onClick={() => handleAddUser(user)}>
                <UseCard user={user} />
              </Box>
            ))}
          </>
        )}
      </List>
    </Box>
  );
}

export default LeftSide;
