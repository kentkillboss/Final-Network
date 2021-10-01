import { Box } from '@material-ui/core';
import ListPage from 'Features/Product/Pages/ListPage';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import DetailPage from './Pages/DetailPage';

Products.propTypes = {};

function Products(props) {
  const match = useRouteMatch();
  return (
    <Box pt={4}>
      <Switch>
        <Route path={match.url} exact component={ListPage} />
        <Route path={`${match.url}/:productId`} component={DetailPage} />
      </Switch>
    </Box>
  );
}

export default Products;
