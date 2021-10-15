import React from 'react';
import { Box, Container, makeStyles, Typography } from '@material-ui/core';
import {
  Bookmark,
  List,
  ExitToApp,
  Home,
  Person,
  PhotoCamera,
  PlayCircleOutline,
  Settings,
  Storefront,
  TabletMac,
} from '@material-ui/icons';
import TelegramIcon from '@material-ui/icons/Telegram';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import ExploreRoundedIcon from '@material-ui/icons/ExploreRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import { Link, NavLink } from 'react-router-dom';
import VideogameAssetRoundedIcon from '@material-ui/icons/VideogameAssetRounded';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100vh',
    color: 'white',
    paddingTop: theme.spacing(10),
    backgroundColor: '#5C8D89',
    position: 'sticky',
    top: 0,
    [theme.breakpoints.up('sm')]: {
      backgroundColor: '#f0f2f5',
      color: '#555',
      border: '1px solid #ece7e7',
    },
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(4),
    [theme.breakpoints.up('sm')]: {
      marginBottom: theme.spacing(3),
      cursor: 'pointer',
    },
  },
  icon: {
    marginRight: theme.spacing(1),
    fontSize: '35px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '18px',
      color: '#fff',
    },
  },
  text: {
    fontWeight: 500,
    // color: 'grey',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  navbarlink: {
    textDecoration: 'none',
    color: '#5C8D89',
  },
}));

function LeftBar(props) {
  const classes = useStyles();
  const isActive = {
    color: '#587850',
  };
  const navLinkItem = [
    {
      text: 'Home',
      icon: <HomeRoundedIcon className={classes.icon} style={{ fontSize: '33px' }} />,
      path: '/',
    },
    {
      text: 'Discover',
      icon: <ExploreRoundedIcon className={classes.icon} style={{ fontSize: '31px' }} />,
      path: '/discover',
    },
    {
      text: 'Message',
      icon: <TelegramIcon className={classes.icon} style={{ fontSize: '31px' }} />,
      path: '/message',
    },
    {
      text: 'Notify',
      icon: <FavoriteRoundedIcon className={classes.icon} style={{ fontSize: '31px' }} />,
      path: '/notify',
    },
    {
      text: 'Games',
      icon: <VideogameAssetRoundedIcon className={classes.icon} style={{ fontSize: '31px' }} />,
      path: '/games',
    },
    {
      text: 'List',
      icon: <List className={classes.icon} style={{ fontSize: '31px' }} />,
      path: '/games',
    },
    {
      text: 'Market Place',
      icon: <Storefront className={classes.icon} style={{ fontSize: '31px' }} />,
      path: '/games',
    },
    {
      text: 'Video',
      icon: <PlayCircleOutline className={classes.icon} style={{ fontSize: '31px' }} />,
      path: '/games',
    },
  ];
  return (
    <Container className={classes.container}>
      {navLinkItem.map((link, index) => (
        <NavLink exact activeStyle={isActive} key={index} to={link.path} className={classes.navbarlink}>
          <div className={classes.item}>
            {link.icon}
            <Typography className={classes.text}>{link.text}</Typography>
          </div>
        </NavLink>
      ))}
      <hr></hr>
      <div className={classes.item}>
        <Bookmark className={classes.icon} style={{ fontSize: '31px' }} />
        <Typography className={classes.text}>Collections</Typography>
      </div>
      <Box>
        <Typography variant="body2" color="textSecondary" align="center">
          <span color="inherit">Quyền riêng tư - điều khoản - quảng cáo - Lựa chọn quảng bá TA Network © 2021</span>{' '}
        </Typography>
      </Box>
    </Container>
  );
}

export default LeftBar;

{
  /* <div className={classes.item}>
        <Person className={classes.icon} />
        <Typography className={classes.text}>Friends</Typography>
      </div>
      <div className={classes.item}>
        <List className={classes.icon} />
        <Typography className={classes.text}>Lists</Typography>
      </div>
      <div className={classes.item}>
        <PhotoCamera className={classes.icon} />
        <Typography className={classes.text}>Camera</Typography>
      </div>
      <div className={classes.item}>
        <PlayCircleOutline className={classes.icon} />
        <Typography className={classes.text}>Videos</Typography>
      </div>
      <div className={classes.item}>
        <TabletMac className={classes.icon} />
        <Typography className={classes.text}>Apps</Typography>
      </div>
      <div className={classes.item}>
        <Bookmark className={classes.icon} />
        <Typography className={classes.text}>Collections</Typography>
      </div>
      <div className={classes.item}>
        <Storefront className={classes.icon} />
        <Typography className={classes.text}>Market Place</Typography>
      </div>
      <div className={classes.item}>
        <Settings className={classes.icon} />
        <Typography className={classes.text}>Settings</Typography>
      </div>
      <div className={classes.item}>
        <ExitToApp className={classes.icon} />
        <Typography className={classes.text}>Logout</Typography>
      </div> */
}
