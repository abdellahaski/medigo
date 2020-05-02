import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import OneString from './one-string';
import OneStringDetail from './one-string-detail';
import OneStringUpdate from './one-string-update';
import OneStringDeleteDialog from './one-string-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={OneStringDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={OneStringUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={OneStringUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={OneStringDetail} />
      <ErrorBoundaryRoute path={match.url} component={OneString} />
    </Switch>
  </>
);

export default Routes;
