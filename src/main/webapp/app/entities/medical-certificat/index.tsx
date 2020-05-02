import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import MedicalCertificat from './medical-certificat';
import MedicalCertificatDetail from './medical-certificat-detail';
import MedicalCertificatUpdate from './medical-certificat-update';
import MedicalCertificatDeleteDialog from './medical-certificat-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={MedicalCertificatDeleteDialog} />
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={MedicalCertificatUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={MedicalCertificatUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={MedicalCertificatDetail} />
      <ErrorBoundaryRoute path={match.url} component={MedicalCertificat} />
    </Switch>
  </>
);

export default Routes;
