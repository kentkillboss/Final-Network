import Loader from 'Components/Loading/LoadingPost';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GLOBALTYPES } from 'Redux/Action/globalTypes';
import Notistack from './Notistack';

function Alert(props) {
  const { alert } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div>
      {alert.loadingg && <Loader />}
      {alert.error && (
        <Notistack
          msg={{ title: 'Error', body: alert.error }}
          handleShow={() => dispatch({ type: GLOBALTYPES.ALERT, payload: {} })}
          bgColor="error"
        />
      )}

      {alert.success && (
        <Notistack
          msg={{ title: 'Success', body: alert.success }}
          handleShow={() => dispatch({ type: GLOBALTYPES.ALERT, payload: {} })}
          bgColor="success"
        />
      )}
    </div>
  );
}

export default Alert;
