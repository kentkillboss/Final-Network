import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import HandleReportPost from 'Admin/Pages/HandleReportPost';
import DashBoard from 'Admin/Pages/Dashboard';

function Router(props) {

  return (
    <>
    <Switch>
      <Route path='/dashboard' exact component={DashBoard}/>
      <Route path='/dashboard/report' component={HandleReportPost}/>
    </Switch>
    </>
  );
}

export default Router;