import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import Header from '../../Components/Header';
import NotFound from '../../Components/NotFound';
import DetailPage from './pages/DetailPage';
import ListPage from './pages/ListPage';

TodoFeature.propTypes = {};

function TodoFeature(props) {
  const match = useRouteMatch();
  return (
    <div>
      <Header />
      <Switch>
        <Route path={match.path} component={ListPage} exact />
        <Route path={`${match.path}/:todoId`} component={DetailPage} />

        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default TodoFeature;
