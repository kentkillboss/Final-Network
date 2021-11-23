import React from 'react';

import './layout.css';

import Sidebar from '../sidebar/Sidebar';

import Routes from 'Admin/index';

import { BrowserRouter, Route } from 'react-router-dom';
import Topnav from 'Admin/components/topnav/TopNav';
import { useSelector } from 'react-redux';

const Layout = () => {
  const {auth} = useSelector(state => state);
  return (
    <BrowserRouter>
      <Route
        render={(props) => (
          <div>
            <Sidebar {...props} />
            <div className="layout__content">
              <Topnav />
              <div className="layout__content-main">
                {window.location.pathname === '/' ? (
                    <div style={{fontSize: '25px'}}>
                      <p>Chào mừng <b>{`${auth.user.username}`}</b> đến với trang quản trị</p>
                      <img src='http://pngimg.com/uploads/welcome/welcome_PNG17.png' width='600px' alt='admin' />
                    </div>
                ) : (
                    <Routes />
                )}
              </div>
            </div>
          </div>
        )}
      />
    </BrowserRouter>
  );
};

export default Layout;
