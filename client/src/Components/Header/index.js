import { Badge, Box, Menu, MenuItem, Typography } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import { Cancel, Mail, Notifications, Search } from '@material-ui/icons';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import SearchCard from 'Components/Search';
import NotifyModal from 'Features/Notify/NotifyModal';
import Logo from 'images/logo1.png';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from 'Redux/Action/authAction';
import { GLOBALTYPES } from 'Redux/Action/globalTypes';
const useStyles = makeStyles((theme) => ({
  link: {
    textDecoration: 'none',
    color: 'black',
  },
  user: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
  },
  img: {
    width: '121%',
    height: '43px',
  },
  logo: {
    fontSize: '30px',
    fontWeight: 'bold',
    display: 'none',
    paddingRight: '10px',
    color: '#fafafa',
    fontFamily: 'Londrina Solid',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  search: {
    width: '50%',
    [theme.breakpoints.down('sm')]: {
      display: (props) => (props.open ? 'flex' : 'none'),
      width: '60%',
      alignItems: 'center',
    },
  },
  logoLg: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  logoSm: {
    display: 'block',
    width: '40px',
    height: '40px',
    marginLeft: '-67px',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  icons: {
    alignItems: 'center',
    display: (props) => (props.open ? 'none' : 'flex'),
  },
  badge: {
    marginRight: theme.spacing(2),
    color: '#ffff',
  },
  searchButton: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  cancel: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
    alignItems: 'center',
  },
}));

export default function Header() {
  const [open, setOpen] = useState(false);
  const classes = useStyles({ open });
  const [anchorEl, setAnchorEl] = React.useState(null);

  const dispatch = useDispatch();
  const { auth, theme, notify } = useSelector((state) => state);
  const newArr = notify.data.filter((item) => item.isRead === false);
  const [showMenu, setShowMenu] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="fixed" style={{ backgroundColor: '#5C8D89' }}>
        <Toolbar className={classes.toolbar}>
          <Link to="/" style={{ color: '#ffff', textDecoration: 'none' }}>
            <Typography
              variant="h6"
              className={classes.logoLg}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              TA-Network
            </Typography>
          </Link>
          <Link to="/" style={{ color: '#ffff', textDecoration: 'none' }}>
            <img className={classes.logoSm} src={Logo} alt="logo" />
          </Link>
          <Box className={classes.search}>
            <SearchCard />
            <Cancel className={classes.cancel} onClick={() => setOpen(false)} />
          </Box>
          <Box className={classes.icons}>
            <IconButton>
              <Search className={classes.searchButton} onClick={() => setOpen(true)} />
            </IconButton>
            <Link to="/message" style={{ color: '#ffff', textDecoration: 'none' }}>
              <IconButton color="inherit">
                <Mail />
              </IconButton>
            </Link>
            <IconButton className={classes.badge} onClick={() => setShowMenu(true)}>
              <Badge badgeContent={newArr.length} color="error">
                <Notifications />
              </Badge>
            </IconButton>

            <IconButton className={classes.user} color="inherit" onClick={handleClick}>
              <Avatar src={auth.user.avatar} style={{ width: '35px', height: '35px' }} />
              <ArrowDropDownIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        getContentAnchorEl={null}
      >
        <MenuItem onClick={handleClose}>
          <Link className={classes.link} to={`/profile/${auth.user._id}`}>
            Profile
          </Link>
        </MenuItem>
        <MenuItem>
          <label
            htmlFor="theme"
            className={classes.link}
            to="/"
            onClick={() =>
              dispatch({
                type: GLOBALTYPES.THEME,
                payload: !theme,
              })
            }
          >
            {theme ? 'Light mode' : 'Dark mode'}
          </label>
        </MenuItem>
        <MenuItem onClick={() => dispatch(logout())}>
          <Link className={classes.link} to="/">
            Logout
          </Link>
        </MenuItem>
      </Menu>
      {showMenu && <NotifyModal setShowMenu={setShowMenu} />}
    </div>
  );
}
