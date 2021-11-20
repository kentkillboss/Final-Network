import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { privateAccount, publicAccount } from 'Redux/Action/profileAction';

PrivateBtn.propTypes = {
  user: PropTypes.object,
};

function PrivateBtn() {
  const [privated, setPrivated] = useState(false);
  const {auth} = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    setPrivated(auth.user.isPrivate);
  }, [auth])

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
        <Button onClick={handleUnSetPrivate} className="btnEdit" variant="outlined">
          Private
        </Button>
      ) : (
        <Button onClick={handleSetPrivate} className="btnEdit" variant="outlined">
          Public
        </Button>
      )}
    </>
  );
}

export default PrivateBtn;
