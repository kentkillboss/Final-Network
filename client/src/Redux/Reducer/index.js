import { combineReducers } from 'redux';
import auth from 'Redux/Reducer/authReduce';
import alert from 'Redux/Reducer/alertReduce';
import theme from 'Redux/Reducer/themeReduce';
import profile from 'Redux/Reducer/profileReduce';
import status from 'Redux/Reducer/statusReduce';
import posts from 'Redux/Reducer/postReduce';
import detailPost from 'Redux/Reducer/detailPostReduce';
import discover from 'Redux/Reducer/discoverReduce';
import suggestions from 'Redux/Reducer/suggestionReduce';
import socket from 'Redux/Reducer/socketReduce';
import notify from 'Redux/Reducer/notifyReduce';
import message from 'Redux/Reducer/messageReduce';
import online from 'Redux/Reducer/onlineReduce';
import call from 'Redux/Reducer/callReduce';
import peer from 'Redux/Reducer/peerReduce';
import admin from 'Redux/Reducer/adminReduce';
import noteList from 'Redux/Reducer/noteReduce';
import request from 'Redux/Reducer/requestReduce';

export default combineReducers({
  auth,
  alert,
  theme,
  profile,
  status,
  posts,
  detailPost,
  discover,
  suggestions,
  socket,
  notify,
  message,
  online,
  call,
  peer,
  admin,
  noteList,
  request
});
