import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CustomLine from './custom-line';
import CustomLineDetail from './custom-line-detail';
import CustomLineUpdate from './custom-line-update';
import CustomLineDeleteDialog from './custom-line-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={CustomLineDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CustomLineUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CustomLineUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CustomLineDetail} />
      <ErrorBoundaryRoute path={match.url} component={CustomLine} />
    </Switch>
  </>
);

export default Routes;
