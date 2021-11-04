import { Box, Container, makeStyles, Typography } from '@material-ui/core';
import { Bookmark, List, PlayCircleOutline, Storefront } from '@material-ui/icons';
import ExploreRoundedIcon from '@material-ui/icons/ExploreRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import TelegramIcon from '@material-ui/icons/Telegram';
import VideogameAssetRoundedIcon from '@material-ui/icons/VideogameAssetRounded';
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  container: {
    height: 'calc(100vh - 65px)',
    color: 'white',
    paddingTop: theme.spacing(2),
    backgroundColor: '#f0f2f5',
    position: 'sticky',
    top: theme.spacing(8),
    [theme.breakpoints.down('sm')]: {
      backgroundColor: '#5C8D89',
      color: '#555',
      border: '1px solid #ece7e7',
      top: theme.spacing(7),
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
  info: {
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}));

function LeftBar(props) {
  const classes = useStyles();
  const { theme } = useSelector((state) => state);
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
      text: 'Video',
      icon: <PlayCircleOutline className={classes.icon} style={{ fontSize: '31px' }} />,
      path: '/video',
    },
    {
      text: 'Games',
      icon: <VideogameAssetRoundedIcon className={classes.icon} style={{ fontSize: '31px' }} />,
      path: '/games',
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
      text: 'List',
      icon: <List className={classes.icon} style={{ fontSize: '31px' }} />,
      path: '/list',
    },
    {
      text: 'Market Place',
      icon: <Storefront className={classes.icon} style={{ fontSize: '31px' }} />,
      path: '/market',
    },
  ];
  return (
    <div className={classes.container} style={{ backgroundColor: theme ? '#e7e6e5' : '' }}>
      <Container style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}>
        {navLinkItem.map((link, index) => (
          <NavLink exact activeStyle={isActive} key={index} to={link.path} className={classes.navbarlink}>
            <div className={classes.item}>
              {link.icon}
              <Typography className={classes.text}>{link.text}</Typography>
            </div>
          </NavLink>
        ))}
        <hr></hr>
        <div className={classes.item} style={{ color: 'grey' }}>
          <Bookmark className={classes.icon} style={{ fontSize: '31px' }} />
          <Typography className={classes.text}>Collections</Typography>
        </div>
        <Box className={classes.info}>
          <Typography variant="body2" color="textSecondary" align="center" style={{ color: theme ? 'white' : 'grey' }}>
            <span color="inherit">Quyền riêng tư - điều khoản - Lựa chọn quảng bá TA Network © 2021</span>{' '}
          </Typography>
        </Box>
      </Container>
    </div>
  );
}

export default LeftBar;
