import React from 'react';
import { Alert } from '@material-ui/lab';

const Notistack = ({ msg, handleShow, bgColor }) => {
  return (
    <>
      <Alert onClose={handleShow} severity={bgColor}>
        {msg.body}
      </Alert>
    </>
  );
};

export default Notistack;
