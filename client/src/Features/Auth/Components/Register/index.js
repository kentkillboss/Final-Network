import React from 'react';
import RegisterForm from '../RegisterForm';
import { useSelector, useDispatch } from 'react-redux';
// import { register } from '../../userSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import { register } from 'Redux/Action/authAction';

Register.propTypes = {};

function Register(props) {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  useEffect(() => {
    if (auth.token) history.push('/');
  }, [auth.token, history]);
  const handleSubmit = async (values) => {
    try {
      // console.log('Form submit', values);

      // values.username = values.email;
      // const action = register(values);
      // const resultAction = await dispatch(action);
      // const user = unwrapResult(resultAction);
      dispatch(register(values));
      // console.log('new user', user);
      // enqueueSnackbar('Register successfully!', { variant: 'success' });
    } catch (error) {
      console.log('failed to register', error);
      enqueueSnackbar(error.message, { variant: 'error' });
    }
  };
  return (
    <div style={{position: 'absolute', top: 0, left: 0, right: 0}}>
      <RegisterForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Register;
