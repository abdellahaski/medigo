import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import MyUser from './my-user';
import MyUserDetail from './my-user-detail';
import MyUserUpdate from './my-user-update';
import MyUserDeleteDialog from './my-user-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={MyUserDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={MyUserUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={MyUserUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={MyUserDetail} />
      <ErrorBoundaryRoute path={match.url} component={MyUser} />
    </Switch>
  </>
);

export default Routes;
