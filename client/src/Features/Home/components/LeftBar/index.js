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
    // [theme.breakpoints.down('sm')]: {
    //   fontSize: '18px',
    //   color: '#fff',
    // },
  },
  text: {
    fontWeight: 500,
    // color: 'grey',
    // [theme.breakpoints.down('sm')]: {
    //   display: 'none',
    // },
  },
  navbarlink: {
    textDecoration: 'none',
    color: '#5C8D89',
  },
}));

function LeftBar(props) {
  const classes = useStyles();
  const { theme, auth } = useSelector((state) => state);
  const isActive = {
    color: '#587850',
  };
  const navLinkItem = [
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
    {
      text: 'Covid-19',
      icon: <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yk/r/qR88GIDM38e.png" className={classes.icon} alt="" />,
      path: '/covid',
    },
    {
      text: 'Ghi Chú',
      icon: <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yd/r/9-o1e6LN_TX.png" className={classes.icon} alt="" />,
      path: '/notes',
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
        <NavLink className={classes.navbarlink} to={`/profile/${auth.user._id}?save-post`}>
        <div className={classes.item} style={{ color: 'grey' }}>
          <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yr/r/2uPlV4oORjU.png" className={classes.icon} alt="" />
          <Typography className={classes.text}>Đã lưu</Typography>
        </div>
        </NavLink>
      </Container>
    </div>
  );
}

export default LeftBar;
