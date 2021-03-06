import {Box} from '@material-ui/core';
import * as React from 'react';
import {useRouteMatch, Route, Redirect, Switch} from 'react-router-dom';

import {Apartments} from './ManagementViews/Apartments';
import {Complaints} from './ManagementViews/Complaints';
import {Reservations} from './ManagementViews/Reservations';

const ManagementRouteComponent = props => {
  return <pre>{JSON.stringify(props, null, 2)}</pre>;
};

const ManagementComponent = props => {
  const {path} = useRouteMatch();
  return (
    <Switch>
      <Route exact path={`${path}/complaints`} component={Complaints} />
      <Route exact path={`${path}/reservations`} component={Reservations} />
      <Route
        path={`${path}/bills-and-payments`}
        component={ManagementRouteComponent}
      />
      <Route
        exact
        path={`${path}/notifications`}
        component={ManagementRouteComponent}
      />
      <Route exact path={`${path}/apartments`} component={Apartments} />
      <Route
        exact
        path={`${path}/profile`}
        component={ManagementRouteComponent}
      />
      <Route
        exact
        path={`${path}/settings`}
        component={ManagementRouteComponent}
      />
      <Redirect to={`${path}/apartments`} />
    </Switch>
  );
};

const ManagementContent = props => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignContent="stretch"
      flex="1"
    >
      <ManagementComponent />
    </Box>
  );
};

export default ManagementContent;
