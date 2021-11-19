import { Box, Container, makeStyles, Typography } from '@material-ui/core';
// import { Bookmark, List, PlayCircleOutline, Storefront } from '@material-ui/icons';
// import ExploreRoundedIcon from '@material-ui/icons/ExploreRounded';
// import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
// import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
// import TelegramIcon from '@material-ui/icons/Telegram';
// import VideogameAssetRoundedIcon from '@material-ui/icons/VideogameAssetRounded';
import React from 'react';
// import Particles from 'react-particles-js';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
// import particlesConfig from 'utils/paritcleConfig';

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
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing(1.5),
      paddingTop: theme.spacing(1.5),
      paddingLeft: theme.spacing(1),
      cursor: 'pointer',
      '&:hover': {
        borderRadius: '5px',
        backgroundColor: '#e0e0e0',
      },
    },
  },
  icon: {
    marginRight: theme.spacing(1),
    // fontSize: '35px',
    width: '40px',
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
    // {
    //   text: 'Home',
    //   icon: <HomeRoundedIcon className={classes.icon} style={{ fontSize: '33px' }} />,
    //   path: '/',
    // },
    // {
    //   text: 'Discover',
    //   icon: <ExploreRoundedIcon className={classes.icon} style={{ fontSize: '31px' }} />,
    //   path: '/discover',
    // },
    // {
    //   text: 'Video',
    //   icon: <PlayCircleOutline className={classes.icon} style={{ fontSize: '31px' }} />,
    //   path: '/video',
    // },
    // {
    //   text: 'Games',
    //   icon: <VideogameAssetRoundedIcon className={classes.icon} style={{ fontSize: '31px' }} />,
    //   path: '/games',
    // },
    // {
    //   text: 'Message',
    //   icon: <TelegramIcon className={classes.icon} style={{ fontSize: '31px' }} />,
    //   path: '/message',
    // },
    // {
    //   text: 'Notify',
    //   icon: <FavoriteRoundedIcon className={classes.icon} style={{ fontSize: '31px' }} />,
    //   path: '/notify',
    // },
    // {
    //   text: 'List',
    //   icon: <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yx/r/-XF4FQcre_i.png" className={classes.icon} alt="" />,
    //   path: '/list',
    // },
    // // {
    // //   text: 'List',
    // //   icon: <List className={classes.icon} style={{ fontSize: '31px' }} />,
    // //   path: '/list',
    // // },
    // {
    //   text: 'Market Place',
    //   icon: <Storefront className={classes.icon} style={{ fontSize: '31px' }} />,
    //   path: '/market',
    // },
    {
      text: 'Trang chủ',
      icon: <img src="https://static.xx.fbcdn.net/rsrc.php/v3/ys/r/9BDqQflVfXI.png" className={classes.icon} alt="" />,
      path: '/',
    },
    {
      text: 'Khám phá',
      icon: <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yI/r/WcCzeboYevF.png" className={classes.icon} alt="" />,
      path: '/discover',
    },
    {
      text: 'Watch',
      icon: <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yG/r/A1HlI2LVo58.png" className={classes.icon} alt="" />,
      path: '/video',
    },
    {
      text: 'Trò chơi',
      icon: <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yn/r/XEWvxf1LQAG.png" className={classes.icon} alt="" />,
      path: '/games',
    },
    {
      text: 'Trò chuyện',
      icon: <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yq/r/YF1bztyGuX-.png" className={classes.icon} alt="" />,
      path: '/message',
    },
    {
      text: 'Weather',
      icon: <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yq/r/kULMG0uFcEQ.png" className={classes.icon} alt="" />,
      path: '/weather',
    },
  ];
  return (
    <div className={classes.container} style={{ backgroundColor: theme ? '#e7e6e5' : '' }}>
      {/* <Particles params={particlesConfig} height="100vh" width="25%" style={{ position: 'fixed' }}></Particles> */}
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
          <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yr/r/2uPlV4oORjU.png" className={classes.icon} alt="" />
          <Typography className={classes.text}>Đã lưu</Typography>
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
