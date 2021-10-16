import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, useRouteMatch } from 'react-router';
import { Box } from '@material-ui/core';
import GameHome from './GameHome';
import WhacAMole from './Whac-A-Mole';

Games.propTypes = {};

function Games(props) {
  const match = useRouteMatch();

  return (
    <Box>
      <Switch>
        <Route path={match.url} exact component={GameHome} />
        <Route path={`${match.url}/whac-a-mole`} component={WhacAMole} />
      </Switch>
    </Box>
  );
}

export default Games;
