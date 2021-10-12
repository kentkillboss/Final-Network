import { Route, Switch } from 'react-router-dom';
import './App.css';
import NotFound from './Components/NotFound';

import Login from './Features/Auth/Components/Login';
import Register from './Features/Auth/Components/Register';
import Home from 'Features/Home';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { refreshToken } from 'Redux/Action/authAction';
import Header from 'Components/Header';
import Message from 'Features/Message';
import Discover from 'Features/Discover';
import Notify from 'Features/Notify';
import Profile from 'Features/Profile';
import Conversation from 'Features/Message/components/conversation/index.js'
import PrivateRouter from 'CustomRouter/customRouter';
import Alert from 'Components/Alert/alert';
import Loading from 'Components/Loading';
import { getPosts } from 'Redux/Action/postAction';
import { getUserActions } from 'Redux/Action/suggestionAction';
import { getNotifies } from 'Redux/Action/notifyAction';
import StatusModal from 'Features/Home/components/Status/StatusModal';
import Post from 'Features/Post';
import io from 'socket.io-client';
import { GLOBALTYPES } from 'Redux/Action/globalTypes';
import SocketClient from 'SocketClient';
import CallModal from 'Features/Message/components/callModal/index';
import Peer from 'peerjs';

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
      path: '/', secure: true
    })
    
    dispatch({ type: GLOBALTYPES.PEER, payload: newPeer })
  },[dispatch])

  return (
    <>
      <input type="checkbox" id="theme" />
      {/* <Loading /> */}
      <Alert />
      <div className="App">
        <div className="main">
          {auth.token && <Header />}
          {status && <StatusModal />}
          {auth.token && <SocketClient />}
          {call && <CallModal />}
          <Switch>
            <Route path="/" component={auth.token ? Home : Login} exact />
            <Route path="/login" component={auth.token ? Home : Login} />
            <Route path="/register" component={Register} />
            <Route path="/post/:id" component={Post} />
            <PrivateRouter path="/message" component={Message} exact />
            <PrivateRouter path="/message/:id" component={Conversation} exact />
            <PrivateRouter path="/discover" component={Discover} />
            <Route path="/notify" component={auth.token ? Notify : Login} />
            <Route path="/profile/:id" component={auth.token ? Profile : Login} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    </>
  );
}

export default App;
