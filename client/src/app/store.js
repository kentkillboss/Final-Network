import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../Features/Auth/userSlice';
import cartReducer from 'Features/Cart/cartSlice';

const rootReducer = {
  user: userReducer,
  cart: cartReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
