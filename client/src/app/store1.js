import { createStore, applyMiddleware } from 'redux';
// import { Provide } from 'react-redux';
import thunk from 'redux-thunk';

import rootReducer from 'Redux/Reducer/index';

import { composeWithDevTools } from 'redux-devtools-extension';

const store1 = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store1;
