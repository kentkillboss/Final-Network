import Alert from 'Components/Alert/alert';
import Header from 'Components/Header';
import PrivateRouter from 'CustomRouter/customRouter';
import Discover from 'Features/Discover';
import Games from 'Features/Games';
import Home from 'Features/Home';
import VideoPosts from 'Features/VideoPost';
import StatusModal from 'Features/Home/components/Status/StatusModal';
import Message from 'Features/Message';
import CallModal from 'Features/Message/components/callModal/index';
import Conversation from 'Features/Message/components/conversation/index.js';
import Post from 'Features/Post';
import Profile from 'Features/Profile';
import Peer from 'peerjs';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { refreshToken } from 'Redux/Action/authAction';
import { GLOBALTYPES } from 'Redux/Action/globalTypes';
import { getNotifies } from 'Redux/Action/notifyAction';
import { getAllPosts, getPosts } from 'Redux/Action/postAction';
import { getUserActions } from 'Redux/Action/suggestionAction';
import io from 'socket.io-client';
import SocketClient from 'SocketClient';
import './App.css';
import NotFound from './Components/NotFound';
import Login from './Features/Auth/Components/Login';
import Register from './Features/Auth/Components/Register';
import Admin from './Admin/components/layout/Layout';
import Activate from './Features/Auth/Components/activate';
import ResetPassword from './Features/Auth/Components/ResetPassword';
import ResetPasswordWithId from './Features/Auth/Components/ChangePassword';
import Weather from 'Features/Weather/index';

function App() {
  const { auth, status, call } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(refreshToken());
    const socket = io();
    dispatch({ type: GLOBALTYPES.SOCKET, payload: socket });
    return () => socket.close();
  }, [dispatch]);

  useEffect(() => {
    if (auth.token) {
      dispatch(getPosts(auth.token));
      dispatch(getUserActions(auth.token));
      dispatch(getNotifies(auth.token));
      dispatch(getAllPosts(auth.token));
    }
  }, [dispatch, auth.token]);

  useEffect(() => {
    if (!('Notification' in window)) {
      alert('This browser does not support desktop notification');
    } else if (Notification.permission === 'granted') {
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(function (permission) {
        if (permission === 'granted') {
        }
      });
    }
  }, []);

  useEffect(() => {
    const newPeer = new Peer(undefined, {
      path: '/',
      secure: true,
    });

    dispatch({ type: GLOBALTYPES.PEER, payload: newPeer });
  }, [dispatch]);

  return (
    <>
      <input type="checkbox" id="theme" />
      {/* <Loading /> */}
      <Alert />
      <div className="App">
        <div className="main">
          {/* {auth.token && <Header/>} */}
          {auth.token ? auth.user.role === 'admin' ? <></> : <Header /> : <></>}

          {status && <StatusModal />}
          {auth.token && <SocketClient />}
          {call && <CallModal />}
          <Switch>
            <Route path="/" component={auth.token ? (auth.user.role === 'admin' ? Admin : Home) : Login} exact />
            <Route path="/login" component={auth.token ? Home : Login} />
            <Route path="/register" component={Register} />
            <Route path="/activate/user/:id" component={Activate} />
            <Route path="/reset-password" component={ResetPassword} exact />
            <Route path="/reset-password/:id" component={ResetPasswordWithId} />
            <PrivateRouter
              path="/post/:id"
              component={auth.token ? (auth.user.role === 'admin' ? Admin : Post) : Login}
            />
            <PrivateRouter
              path="/message"
              component={auth.token ? (auth.user.role === 'admin' ? Admin : Message) : Login}
              exact
            />
            <PrivateRouter
              path="/message/:id"
              component={auth.token ? (auth.user.role === 'admin' ? Admin : Conversation) : Login}
              exact
            />
            <PrivateRouter
              path="/discover"
              component={auth.token ? (auth.user.role === 'admin' ? Admin : Discover) : Login}
            />
            <PrivateRouter
              path="/profile/:id"
              component={auth.token ? (auth.user.role === 'admin' ? Admin : Profile) : Login}
            />
            <PrivateRouter path="/games" component={Games} />
            <PrivateRouter
              path="/dashboard"
              component={auth.token ? (auth.user.role === 'admin' ? Admin : Home) : Login}
            />
            <PrivateRouter
              path="/video"
              component={auth.token ? (auth.user.role === 'admin' ? Admin : VideoPosts) : Login}
            />
            <PrivateRouter
              path="/weather"
              component={auth.token ? (auth.user.role === 'admin' ? Admin : Weather) : Login}
            />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    </>
  );
}

export default App;
