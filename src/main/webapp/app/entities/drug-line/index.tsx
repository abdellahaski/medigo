import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import DrugLine from './drug-line';
import DrugLineDetail from './drug-line-detail';
import DrugLineUpdate from './drug-line-update';
import DrugLineDeleteDialog from './drug-line-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={DrugLineDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={DrugLineUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={DrugLineUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={DrugLineDetail} />
      <ErrorBoundaryRoute path={match.url} component={DrugLine} />
    </Switch>
  </>
);

export default Routes;
