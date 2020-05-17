import {Box} from '@material-ui/core';
import * as React from 'react';
import {useRouteMatch, Route, Redirect, Switch} from 'react-router-dom';

const ManagementRouteComponent = props => {
  return <pre>{JSON.stringify(props, null, 2)}</pre>;
};

const ManagementComponent = props => {
  const {path} = useRouteMatch();
  return (
    <Switch>
      <Route
        exact
        path={`${path}/complaints`}
        component={ManagementRouteComponent}
      />
      <Route
        exact
        path={`${path}/reservations`}
        component={ManagementRouteComponent}
      />
      <Route
        path={`${path}/bills-and-payments`}
        component={ManagementRouteComponent}
      />
      <Route
        exact
        path={`${path}/notifications`}
        component={ManagementRouteComponent}
      />
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
      <Redirect to={`${path}/complaints`} />
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
