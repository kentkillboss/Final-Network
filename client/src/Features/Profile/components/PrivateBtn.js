import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { privateAccount, publicAccount } from 'Redux/Action/profileAction';

PrivateBtn.propTypes = {
  user: PropTypes.object,
};

function PrivateBtn() {
  const [privated, setPrivated] = useState(false);
  const { auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    setPrivated(auth.user.isPrivate);
  }, [auth]);

  const handleSetPrivate = () => {
    setPrivated(true);
    dispatch(privateAccount(auth));
  };
  const handleUnSetPrivate = () => {
    setPrivated(false);
    dispatch(publicAccount(auth));
  };

  return (
    <>
      {privated ? (
        <Typography onClick={handleUnSetPrivate} style={{ color: 'black', width: '100%' }}>
          Riêng tư
        </Typography>
      ) : (
        <Typography onClick={handleSetPrivate} style={{ color: 'black', width: '100%' }}>
          Công khai
        </Typography>
      )}
    </>
  );
}

export default PrivateBtn;
