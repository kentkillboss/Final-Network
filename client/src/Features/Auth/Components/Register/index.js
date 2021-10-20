import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { register } from 'Redux/Action/authAction';
import RegisterForm from '../RegisterForm';

Register.propTypes = {};

function Register(props) {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const history = useHistory();
  useEffect(() => {
    if (auth.token) history.push('/');
  }, [auth.token, history]);
  const handleSubmit = async (values) => {
    try {
      dispatch(register(values));
    } catch (error) {
      console.log('failed to register', error);
    }
  };
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
      <RegisterForm onSubmit={handleSubmit} />
    </div>
  );
}

export default Register;
