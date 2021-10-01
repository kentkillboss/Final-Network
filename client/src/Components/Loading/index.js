import { Box, Grid, makeStyles } from '@material-ui/core';
import React from 'react';
import './style.css';
import { useSelector, useDispatch } from 'react-redux';

Loading.propTypes = {};
const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'nowrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '30%',
  },
  box: {
    backgroundColor: '#0005',
    position: 'fixed',
    width: '100%',
    height: '100%',
  },
}));
function Loading(props) {
  const { alert } = useSelector((state) => state);
  const classes = useStyle();
  return (
    <>
      {alert.loading && (
        <Box className={classes.box}>
          <Grid xs={12} className={classes.root}>
            <div class="loadingio-spinner-ripple-mf1tndci8dl">
              <div class="ldio-pleln6jnbgi">
                <div></div>
                <div></div>
              </div>
            </div>
          </Grid>
        </Box>
      )}
    </>
  );
}

export default Loading;
