import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GLOBALTYPES } from 'Redux/Action/globalTypes';
import Notistack from './Notistack';

// Notify.propTypes = {};
// const useStyles = makeStyles((theme) => ({
//   progress: {
//     top: theme.spacing(1),
//     margin: theme.spacing(8, 4),
//   },
// }));

function Alert(props) {
  //   const classes = useStyles();
  const { alert } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div>
      {/* {notify.loading && <Loading />} */}
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
