import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './appointment.reducer';
import { IAppointment } from 'app/shared/model/appointment.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAppointmentDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AppointmentDetail = (props: IAppointmentDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { appointmentEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="mediGoApp.appointment.detail.title">Appointment</Translate> [<b>{appointmentEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="dateTime">
              <Translate contentKey="mediGoApp.appointment.dateTime">Date Time</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={appointmentEntity.dateTime} type="date" format={APP_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="notes">
              <Translate contentKey="mediGoApp.appointment.notes">Notes</Translate>
            </span>
          </dt>
          <dd>{appointmentEntity.notes}</dd>
          <dt>
            <Translate contentKey="mediGoApp.appointment.patient">Patient</Translate>
          </dt>
          <dd>{appointmentEntity.patient ? appointmentEntity.patient.id : ''}</dd>
          <dt>
            <Translate contentKey="mediGoApp.appointment.cabinet">Cabinet</Translate>
          </dt>
          <dd>{appointmentEntity.cabinet ? appointmentEntity.cabinet.id : ''}</dd>
          <dt>
            <Translate contentKey="mediGoApp.appointment.consultation">Consultation</Translate>
          </dt>
          <dd>{appointmentEntity.consultation ? appointmentEntity.consultation.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/appointment" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/appointment/${appointmentEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ appointment }: IRootState) => ({
  appointmentEntity: appointment.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AppointmentDetail);
