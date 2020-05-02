import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import MyUser from './my-user';
import Appointment from './appointment';
import Cabinet from './cabinet';
import Consultation from './consultation';
import Prescription from './prescription';
import DrugLine from './drug-line';
import CustomLine from './custom-line';
import Drug from './drug';
import OneString from './one-string';
import MedicalCertificat from './medical-certificat';
import Insurance from './insurance';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}my-user`} component={MyUser} />
      <ErrorBoundaryRoute path={`${match.url}appointment`} component={Appointment} />
      <ErrorBoundaryRoute path={`${match.url}cabinet`} component={Cabinet} />
      <ErrorBoundaryRoute path={`${match.url}consultation`} component={Consultation} />
      <ErrorBoundaryRoute path={`${match.url}prescription`} component={Prescription} />
      <ErrorBoundaryRoute path={`${match.url}drug-line`} component={DrugLine} />
      <ErrorBoundaryRoute path={`${match.url}custom-line`} component={CustomLine} />
      <ErrorBoundaryRoute path={`${match.url}drug`} component={Drug} />
      <ErrorBoundaryRoute path={`${match.url}one-string`} component={OneString} />
      <ErrorBoundaryRoute path={`${match.url}medical-certificat`} component={MedicalCertificat} />
      <ErrorBoundaryRoute path={`${match.url}insurance`} component={Insurance} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
