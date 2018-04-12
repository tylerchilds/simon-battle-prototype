import React from 'react';
import { Switch, Route } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { history } from 'store/index';
import Layout from 'containers/layout';
import Simon from 'containers/simon';

const routes = (
  <ConnectedRouter history={history}>
    <Layout>
      <Switch>
        <Route exact path="/" component={Simon} />
      </Switch>
    </Layout>
  </ConnectedRouter>
);

export default routes;
