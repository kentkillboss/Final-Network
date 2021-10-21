import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LoginForm from '../LoginForm';
import { useEffect } from 'react';
import { login } from 'Redux/Action/authAction';

Login.propTypes = {};

function Login(props) {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const history = useHistory();
  useEffect(() => {
    if (auth.token) history.push('/');
  }, [auth.token, history]);
  const handleSubmit = async (values) => {
    try {
      // console.log('Form submit', values);
      // const action = login(values);
      // const resultAction = await dispatch(action);
      // const user = unwrapResult(resultAction);
      dispatch(login(values));
      // console.log('new user', user);
      // history.push('/');
      // enqueueSnackbar(notify.success, { variant: 'success' });
    } catch (error) {
      console.log('failed to login', error);
      // enqueueSnackbar(error.message, { variant: 'error' });
    }
  };
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
      <LoginForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Login;
