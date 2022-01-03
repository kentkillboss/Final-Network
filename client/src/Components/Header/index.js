import { Badge, Box, Menu, MenuItem, Typography } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import { Cancel, Mail, Notifications, Search } from '@material-ui/icons';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Brightness4RoundedIcon from '@material-ui/icons/Brightness4Rounded';
import Brightness7RoundedIcon from '@material-ui/icons/Brightness7Rounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import SearchCard from 'Components/Search';
import NotifyModal from 'Features/Notify/NotifyModal';
import Logo from 'images/logo1.png';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from 'Redux/Action/authAction';
import { GLOBALTYPES } from 'Redux/Action/globalTypes';
const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: 1100,
    position: 'sticky',
    top: 0,
  },
  appBar: {
    // backgroundColor: '#5C8D89',
    backgroundColor: '#ffffffff',
  },
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
    fontSize: '25px',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
      color: '#5C8D89',
    },
  },
  logoSm: {
    display: 'block',
    width: '40px',
    height: '40px',
    marginLeft: '-45px',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  logoSm1: {
    display: 'block',
    width: '40px',
    height: '40px',
    marginRight: '10px',
    [theme.breakpoints.down('sm')]: {
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
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  cancel: {
    [theme.breakpoints.up('md')]: {
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
      <AppBar position="sticky" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Link to="/" style={{ color: '#ffff', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            <img
              className={classes.logoSm1}
              src={Logo}
              alt="logo"
              style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}
            />
            <Typography
              variant="h6"
              className={classes.logoLg}
              onClick={() => window.scrollTo({ top: 0 })}
              style={{ fontFamily: 'Acme, cursive', filter: theme ? 'invert(1)' : 'invert(0)' }}
            >
              Dulcie
            </Typography>
          </Link>
          <Link to="/" style={{ color: '#ffff', textDecoration: 'none' }}>
            <img className={classes.logoSm} src={Logo} alt="logo" />
          </Link>
          <Box className={classes.search} style={{ color: 'black' }}>
            <SearchCard />
            <Cancel className={classes.cancel} onClick={() => setOpen(false)} />
          </Box>
          <Box className={classes.icons}>
            <IconButton>
              <Search className={classes.searchButton} onClick={() => setOpen(true)} />
            </IconButton>
            <Link to="/bookmarks" style={{ color: '#ffff', textDecoration: 'none' }}>
              <IconButton>
                <MenuRoundedIcon className={classes.searchButton} />
              </IconButton>
            </Link>
            <Link to="/message" style={{ color: '#ffff', textDecoration: 'none' }}>
              <IconButton color="inherit">
                <Mail style={{ color: 'black' }} />
              </IconButton>
            </Link>
            <IconButton className={classes.badge} onClick={() => setShowMenu(true)}>
              <Badge badgeContent={newArr.length} color="error">
                <Notifications style={{ color: 'black' }} />
              </Badge>
            </IconButton>

            <IconButton className={classes.user} color="inherit" onClick={handleClick}>
              <Avatar
                src={auth.user.avatar}
                style={{ width: '35px', height: '35px', filter: theme ? 'invert(1)' : 'invert(0)' }}
              />
              <ArrowDropDownIcon style={{ color: 'black' }} />
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
          <Link className={classes.link} style={{ display: 'flex' }} to={`/profile/${auth.user._id}`}>
            <PersonRoundedIcon style={{ marginRight: '10px', marginLeft: '-7px' }} /> Trang cá nhân
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
            {theme ? (
              <Box style={{ display: 'flex' }}>
                <Brightness7RoundedIcon style={{ marginRight: '10px', marginLeft: '-7px' }} /> Chế độ sáng{' '}
              </Box>
            ) : (
              <Box style={{ display: 'flex' }}>
                {' '}
                <Brightness4RoundedIcon style={{ marginRight: '10px', marginLeft: '-7px' }} />
                Chế độ tối{' '}
              </Box>
            )}
          </label>
        </MenuItem>
        <MenuItem onClick={() => dispatch(logout())} style={{ borderTop: '1px solid #74B49B' }}>
          <Link className={classes.link} to="/" style={{ display: 'flex' }}>
            <ExitToAppRoundedIcon style={{ marginRight: '10px', marginLeft: '-7px' }} />
            Đăng xuất
          </Link>
        </MenuItem>
      </Menu>
      {showMenu && <NotifyModal setShowMenu={setShowMenu} />}
    </div>
  );
}
