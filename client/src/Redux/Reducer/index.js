import { combineReducers } from 'redux';
import auth from 'Redux/Reducer/authReduce';
import alert from 'Redux/Reducer/alertReduce';
import theme from 'Redux/Reducer/themeReduce';
import profile from 'Redux/Reducer/profileReduce';
import status from 'Redux/Reducer/statusReduce';
import posts from 'Redux/Reducer/postReduce';
import detailPost from 'Redux/Reducer/detailPostReduce';
import discover from 'Redux/Reducer/discoverReduce';
export default combineReducers({
  auth,
  alert,
  theme,
  profile,
  status,
  posts,
  detailPost,
  discover,
});
