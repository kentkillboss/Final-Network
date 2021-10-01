import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core';
import Loading from 'Components/Loading';
import Notistack from './Notistack';
import { GLOBALTYPES } from 'Redux/Action/globalTypes';

Notify.propTypes = {};
// const useStyles = makeStyles((theme) => ({
//   progress: {
//     top: theme.spacing(1),
//     margin: theme.spacing(8, 4),
//   },
// }));

function Notify(props) {
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

export default Notify;
