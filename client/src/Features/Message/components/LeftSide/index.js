import {
  Box,
  FormControl,
  InputAdornment,
  InputLabel,
  ListItemAvatar,
  OutlinedInput,
  Typography,
  withStyles,
} from '@material-ui/core';
import List from '@material-ui/core/List';
import { makeStyles } from '@material-ui/core/styles';
import CancelRoundedIcon from '@material-ui/icons/CancelRounded';
import SearchIcon from '@material-ui/icons/Search';
import { getDataAPI } from 'api/fetchData';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { GLOBALTYPES } from 'Redux/Action/globalTypes';
import { getConversations, MESS_TYPES } from 'Redux/Action/messageAction';
import SearchCardMessage from '../SearchCardMessage';
import UseCard from '../UseCard';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 'calc(100vh - 68px)',
    borderRight: '1px solid #deb7b7',
    paddingTop: '20px',
  },
  listItem: {
    width: '98%',
    backgroundColor: theme.palette.background.paper,
    marginTop: '5px',
    marginLeft: '2%',
    maxHeight: 'calc(100vh - 150px)',
    overflowY: 'scroll',
    [theme.breakpoints.down('sm')]: {
      width: '98%',
      backgroundColor: theme.palette.background.paper,
      marginTop: '5px',
      marginLeft: '2%',
    },
  },
  search: {
    width: '80%',
    marginLeft: '8%',
    background: '#ffffff',
    borderRadius: '15px',
    height: '45px',
    [theme.breakpoints.down('sm')]: {
      width: '98%',
      marginLeft: '1%',
      borderRadius: '5px',
    },
  },
  labelInput: {
    fontWeight: 'bold',
    fontSize: '14px',
    paddingLeft: '50px',
    paddingTop: '3px',
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '2px',
      paddingTop: '3px',
    },
  },
  online: {
    position: 'absolute',
    top: '50%',
    right: '10px',
  },
  cancelIcon: {
    padding: theme.spacing(0, 2),
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '54px',
    right: '46px',
    top: '9px',
    cursor: 'pointer',
    color: '#577875',
    [theme.breakpoints.down('sm')]: {
      padding: 0,
      right: '5px',
    },
  },
  boxUserCard: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  small: {
    width: theme.spacing(6),
    height: theme.spacing(6),
    marginRight: '26px',
  },
  avataSugg: {
    display: 'flex',
    marginRight: 10,
    width: '100%',
    overflowX: 'hidden',
    transition: '0.5s',
    height: 80,
    '&:hover': {
      overflowX: 'scroll',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
}));

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: '32px',
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);

function LeftSide(props) {
  const classes = useStyles();

  const [search, setSearch] = useState();
  const [searchUsers, setSearchUsers] = useState([]);
  const { auth, message, online, theme } = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useHistory();
  const pageEnd = useRef();
  const [page, setPage] = useState(0);

  // const handleSearch = async (e) => {
  //   e.preventDefault();
  //   if (!search) return setSearchUsers([]);

  //   try {
  //     const res = await getDataAPI(`search?username=${search}`, auth.token);
  //     setSearchUsers(res.data.users);
  //   } catch (err) {
  //     dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err.response.data.msg } });
  //   }
  // };
  useEffect(() => {
    // if (!search) return setSearchUsers([]);

    if (search) {
      getDataAPI(`search?username=${search}`, auth.token)
        .then((res) => setSearchUsers(res.data.users))
        .catch((err) => {
          dispatch({
            type: GLOBALTYPES.ALERT,
            payload: {
              err: err.response.data.msg,
            },
          });
        });
    } else {
      setSearchUsers([]);
    }
  }, [search, auth.token, dispatch]);
  const handleAddUser = (user) => {
    setSearch('');
    setSearchUsers([]);
    dispatch({ type: MESS_TYPES.ADD_USER, payload: { ...user, text: '', media: [] } });
    dispatch({ type: MESS_TYPES.CHECK_ONLINE_OFFLINE, payload: online });
    return history.push(`/message/${user._id}`);
  };

  useEffect(() => {
    if (message.firstLoad) return;
    dispatch(getConversations({ auth }));
  }, [dispatch, auth, message.firstLoad]);

  //loadmore
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((p) => p + 1);
        }
      },
      {
        threshold: 0.1,
      }
    );
    observer.observe(pageEnd.current);
  }, [setPage]);

  useEffect(() => {
    if (message.resultUsers >= (page - 1) * 9 && page - 1) {
      dispatch(getConversations({ auth, page }));
    }
  }, [message.resultUsers, page, auth, dispatch]);

  //Check user online/offline
  useEffect(() => {
    if (message.firstLoad) {
      dispatch({ type: MESS_TYPES.CHECK_ONLINE_OFFLINE, payload: online });
    }
  }, [online, message.firstLoad, dispatch]);

  const handleClose = () => {
    setSearch('');
    setSearchUsers([]);
  };

  // useEffect(() => {
  //   var item = document.getElementById('id');

  //   window.addEventListener('wheel', function (e) {
  //     if (e.deltaY > 0) item.scrollLeft += 1;
  //     else item.scrollLeft -= 1;
  //   });
  // });
  let b;
  auth.user.following.map((item) => {
    return (b = online.map((x) => x === item._id));
  });

  return (
    <Box className={classes.root} style={{ backgroundColor: theme ? '#e7e6e5' : '#ffffff' }}>
      <form autoComplete="off">
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-adornment-amount" className={classes.labelInput}>
            Nhập để tìm kiếm
          </InputLabel>
          <OutlinedInput
            style={{ backgroundColor: theme ? '#c5c4c3' : '#f0f2f5' }}
            className={classes.search}
            id="outlined-adornment-amount"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            labelWidth={110}
          />
          {search && <CancelRoundedIcon onClick={handleClose} className={classes.cancelIcon} />}
        </FormControl>
      </form>

      <Box>
        <List component="nav" className={classes.listItem} style={{ backgroundColor: theme ? '#e7e6e5' : '#ffffff' }}>
          {search && searchUsers.length !== 0 ? (
            <>
              {searchUsers.map((user) => (
                <Box key={user._id} onClick={() => handleAddUser(user)}>
                  <SearchCardMessage user={user} />
                </Box>
              ))}
            </>
          ) : (
            <>
              {b.length !== 0 ? (
                <Box id="id" className={classes.avataSugg}>
                  {auth.user.following.map((item, index) => (
                    <Box>
                      {online.map(
                        (idx) =>
                          idx === item._id && (
                            // <Box>
                            //   <Avatar onClick={() => handleAddUser(item)} className={classes.small} src={item.avatar} />
                            //   <Typography>{item.username.slice(0, 5)}...</Typography>
                            // </Box>
                            <>
                              <ListItemAvatar>
                                <StyledBadge
                                  overlap="circular"
                                  anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                  }}
                                  variant={'dot'}
                                >
                                  <Avatar
                                    alt="Remy Sharp"
                                    onClick={() => handleAddUser(item)}
                                    className={classes.small}
                                    src={item.avatar}
                                    style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}
                                  />
                                </StyledBadge>
                              </ListItemAvatar>
                              <Typography>{item.username.slice(0, 5)}...</Typography>
                            </>
                          )
                      )}
                    </Box>
                  ))}
                </Box>
              ) : (
                ''
              )}

              {message.users.map((user) => (
                <Box key={user._id} onClick={() => handleAddUser(user)} className={classes.boxUserCard}>
                  <UseCard user={user} msg={true} />
                </Box>
              ))}
            </>
          )}
        </List>
      </Box>

      <button ref={pageEnd} style={{ display: 'none' }}>
        LoadMore
      </button>
    </Box>
  );
}

export default LeftSide;
