import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IConsultation } from 'app/shared/model/consultation.model';
import { getEntities as getConsultations } from 'app/entities/consultation/consultation.reducer';
import { getEntity, updateEntity, createEntity, reset } from './medical-certificat.reducer';
import { IMedicalCertificat } from 'app/shared/model/medical-certificat.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IMedicalCertificatUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const MedicalCertificatUpdate = (props: IMedicalCertificatUpdateProps) => {
  const [consultationId, setConsultationId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { medicalCertificatEntity, consultations, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/medical-certificat');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getConsultations();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.date = convertDateTimeToServer(values.date);
    values.startDate = convertDateTimeToServer(values.startDate);
    values.endDate = convertDateTimeToServer(values.endDate);

    if (errors.length === 0) {
      const entity = {
        ...medicalCertificatEntity,
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
          <h2 id="mediGoApp.medicalCertificat.home.createOrEditLabel">
            <Translate contentKey="mediGoApp.medicalCertificat.home.createOrEditLabel">Create or edit a MedicalCertificat</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : medicalCertificatEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="medical-certificat-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="medical-certificat-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="dateLabel" for="medical-certificat-date">
                  <Translate contentKey="mediGoApp.medicalCertificat.date">Date</Translate>
                </Label>
                <AvInput
                  id="medical-certificat-date"
                  type="datetime-local"
                  className="form-control"
                  name="date"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.medicalCertificatEntity.date)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="startDateLabel" for="medical-certificat-startDate">
                  <Translate contentKey="mediGoApp.medicalCertificat.startDate">Start Date</Translate>
                </Label>
                <AvInput
                  id="medical-certificat-startDate"
                  type="datetime-local"
                  className="form-control"
                  name="startDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.medicalCertificatEntity.startDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="endDateLabel" for="medical-certificat-endDate">
                  <Translate contentKey="mediGoApp.medicalCertificat.endDate">End Date</Translate>
                </Label>
                <AvInput
                  id="medical-certificat-endDate"
                  type="datetime-local"
                  className="form-control"
                  name="endDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.medicalCertificatEntity.endDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="daysLabel" for="medical-certificat-days">
                  <Translate contentKey="mediGoApp.medicalCertificat.days">Days</Translate>
                </Label>
                <AvField id="medical-certificat-days" type="string" className="form-control" name="days" />
              </AvGroup>
              <AvGroup>
                <Label id="urlIdLabel" for="medical-certificat-urlId">
                  <Translate contentKey="mediGoApp.medicalCertificat.urlId">Url Id</Translate>
                </Label>
                <AvField id="medical-certificat-urlId" type="text" name="urlId" />
              </AvGroup>
              <AvGroup>
                <Label for="medical-certificat-consultation">
                  <Translate contentKey="mediGoApp.medicalCertificat.consultation">Consultation</Translate>
                </Label>
                <AvInput id="medical-certificat-consultation" type="select" className="form-control" name="consultation.id">
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
              <Button tag={Link} id="cancel-save" to="/medical-certificat" replace color="info">
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
  consultations: storeState.consultation.entities,
  medicalCertificatEntity: storeState.medicalCertificat.entity,
  loading: storeState.medicalCertificat.loading,
  updating: storeState.medicalCertificat.updating,
  updateSuccess: storeState.medicalCertificat.updateSuccess
});

const mapDispatchToProps = {
  getConsultations,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MedicalCertificatUpdate);
