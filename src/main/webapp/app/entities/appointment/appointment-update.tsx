import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IMyUser } from 'app/shared/model/my-user.model';
import { getEntities as getMyUsers } from 'app/entities/my-user/my-user.reducer';
import { ICabinet } from 'app/shared/model/cabinet.model';
import { getEntities as getCabinets } from 'app/entities/cabinet/cabinet.reducer';
import { IConsultation } from 'app/shared/model/consultation.model';
import { getEntities as getConsultations } from 'app/entities/consultation/consultation.reducer';
import { getEntity, updateEntity, createEntity, reset } from './appointment.reducer';
import { IAppointment } from 'app/shared/model/appointment.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAppointmentUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AppointmentUpdate = (props: IAppointmentUpdateProps) => {
  const [patientId, setPatientId] = useState('0');
  const [cabinetId, setCabinetId] = useState('0');
  const [consultationId, setConsultationId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { appointmentEntity, myUsers, cabinets, consultations, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/appointment');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getMyUsers();
    props.getCabinets();
    props.getConsultations();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.dateTime = convertDateTimeToServer(values.dateTime);

    if (errors.length === 0) {
      const entity = {
        ...appointmentEntity,
        ...values
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="mediGoApp.appointment.home.createOrEditLabel">
            <Translate contentKey="mediGoApp.appointment.home.createOrEditLabel">Create or edit a Appointment</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : appointmentEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="appointment-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="appointment-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="dateTimeLabel" for="appointment-dateTime">
                  <Translate contentKey="mediGoApp.appointment.dateTime">Date Time</Translate>
                </Label>
                <AvInput
                  id="appointment-dateTime"
                  type="datetime-local"
                  className="form-control"
                  name="dateTime"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.appointmentEntity.dateTime)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="notesLabel" for="appointment-notes">
                  <Translate contentKey="mediGoApp.appointment.notes">Notes</Translate>
                </Label>
                <AvField id="appointment-notes" type="text" name="notes" />
              </AvGroup>
              <AvGroup>
                <Label for="appointment-patient">
                  <Translate contentKey="mediGoApp.appointment.patient">Patient</Translate>
                </Label>
                <AvInput id="appointment-patient" type="select" className="form-control" name="patient.id">
                  <option value="" key="0" />
                  {myUsers
                    ? myUsers.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="appointment-cabinet">
                  <Translate contentKey="mediGoApp.appointment.cabinet">Cabinet</Translate>
                </Label>
                <AvInput id="appointment-cabinet" type="select" className="form-control" name="cabinet.id">
                  <option value="" key="0" />
                  {cabinets
                    ? cabinets.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="appointment-consultation">
                  <Translate contentKey="mediGoApp.appointment.consultation">Consultation</Translate>
                </Label>
                <AvInput id="appointment-consultation" type="select" className="form-control" name="consultation.id">
                  <option value="" key="0" />
                  {consultations
                    ? consultations.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/appointment" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  myUsers: storeState.myUser.entities,
  cabinets: storeState.cabinet.entities,
  consultations: storeState.consultation.entities,
  appointmentEntity: storeState.appointment.entity,
  loading: storeState.appointment.loading,
  updating: storeState.appointment.updating,
  updateSuccess: storeState.appointment.updateSuccess
});

const mapDispatchToProps = {
  getMyUsers,
  getCabinets,
  getConsultations,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentUpdate);
