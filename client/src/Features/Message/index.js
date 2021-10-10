import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import LeftSide from './components/LeftSide/index.js';
import RightSide from './components/RightSide/index.js';
import ImgMess from 'images/image-mess.png';

Message.propTypes = {};

function Message(props) {
  return (
    <div>
      <Grid container>
        <Grid item xs={4} style={{ display: 'block', paddingTop: '60px' }}>
          <LeftSide />
        </Grid>
        <Grid item xs={8} style={{ display: 'block', paddingTop: '60px' }}>
          <img style={{ position: 'absolute', top: '41%', right: '25%' }} src={ImgMess} alt="mess"></img>
        </Grid>
      </Grid>
    </div>
  );
}

export default Message;
