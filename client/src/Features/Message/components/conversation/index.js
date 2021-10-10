import React from 'react';
import { Grid } from '@material-ui/core';
import LeftSide from '../LeftSide';
import RightSide from '../RightSide';

function Conversation(props) {
  return (
    <div>
      <Grid container>
        <Grid item xs={4} style={{ display: 'block', paddingTop: '60px' }}>
          <LeftSide />
        </Grid>
        <Grid item xs={8} style={{ display: 'block', paddingTop: '60px' }}>
          <RightSide />
        </Grid>
      </Grid>
    </div>
  );
}

export default Conversation;
