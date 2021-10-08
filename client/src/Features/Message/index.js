import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import LeftSide from './components/LeftSide/index.js';
import RightSide from './components/RightSide/index.js';


Message.propTypes = {};

function Message(props) {
  return (
    <div style={{marginTop: '80px'}}>
      <Grid container >
        <Grid item xs={4}>
          <LeftSide />
        </Grid>
        <Grid  item xs={8}>
          <img src='https://play-lh.googleusercontent.com/ldcQMpP7OaVmglCF6kGas9cY_K0PsJzSSosx2saw9KF1m3RHaEXpH_9mwBWaYnkmctk' alt='mess'></img>
        </Grid>
      </Grid>
    </div>
  );
}

export default Message;
