import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Consultation from './consultation';
import ConsultationDetail from './consultation-detail';
import ConsultationUpdate from './consultation-update';
import ConsultationDeleteDialog from './consultation-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={ConsultationDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ConsultationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ConsultationUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ConsultationDetail} />
      <ErrorBoundaryRoute path={match.url} component={Consultation} />
    </Switch>
  </>
);

export default Routes;
