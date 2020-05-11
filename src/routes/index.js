import React, {Suspense} from 'react';
import {Switch, Route} from 'react-router-dom';

import Home from '../containers/Home';
import OnboardSociety from '../containers/OnboardSociety';

const Routes = props => {
  return (
    <Suspense fallback={<div style={{padding: '10px 20px'}} />}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/onboard-society" component={OnboardSociety} />
      </Switch>
    </Suspense>
  );
};

export default Routes;
