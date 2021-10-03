import React from 'react';
import { Container, makeStyles, Typography } from '@material-ui/core';
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

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100vh',
    color: 'white',
    paddingTop: theme.spacing(10),
    backgroundColor: theme.palette.primary.main,
    position: 'sticky',
    top: 0,
    [theme.breakpoints.up('sm')]: {
      backgroundColor: 'white',
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
    color: 'grey',
    fontSize: '30px',
    [theme.breakpoints.up('sm')]: {
      fontSize: '18px',
    },
  },
  text: {
    fontWeight: 500,
    color: 'grey',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  navbarlink: {
    color: '#fff',
  },
}));

function LeftBar(props) {
  const classes = useStyles();
  const isActive = {
    color: 'pink',
    borderBottom: '2px solid pink',
  };
  const navLinkItem = [
    {
      text: 'Home',
      icon: <HomeRoundedIcon className={classes.icon} style={{ fontSize: '28px' }} />,
      path: '/',
    },
    {
      text: 'Discover',
      icon: <ExploreRoundedIcon className={classes.icon} style={{ fontSize: '28px' }} />,
      path: '/discover',
    },
    {
      text: 'Message',
      icon: <TelegramIcon className={classes.icon} style={{ fontSize: '28px' }} />,
      path: '/message',
    },
    {
      text: 'Notify',
      icon: <FavoriteRoundedIcon className={classes.icon} style={{ fontSize: '28px' }} />,
      path: '/notify',
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
      {/* <div className={classes.item}>
        <Home className={classes.icon} />
        <Typography className={classes.text}>Homepage</Typography>
      </div>
      <div className={classes.item}>
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
      </div> */}
    </Container>
  );
}

export default LeftBar;
