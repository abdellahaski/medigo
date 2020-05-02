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
import { getEntity, updateEntity, createEntity, reset } from './insurance.reducer';
import { IInsurance } from 'app/shared/model/insurance.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IInsuranceUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const InsuranceUpdate = (props: IInsuranceUpdateProps) => {
  const [consultationId, setConsultationId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { insuranceEntity, consultations, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/insurance');
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
    if (errors.length === 0) {
      const entity = {
        ...insuranceEntity,
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
          <h2 id="mediGoApp.insurance.home.createOrEditLabel">
            <Translate contentKey="mediGoApp.insurance.home.createOrEditLabel">Create or edit a Insurance</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : insuranceEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="insurance-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="insurance-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="companyLabel" for="insurance-company">
                  <Translate contentKey="mediGoApp.insurance.company">Company</Translate>
                </Label>
                <AvField id="insurance-company" type="text" name="company" />
              </AvGroup>
              <AvGroup>
                <Label id="affiliationNumberLabel" for="insurance-affiliationNumber">
                  <Translate contentKey="mediGoApp.insurance.affiliationNumber">Affiliation Number</Translate>
                </Label>
                <AvField id="insurance-affiliationNumber" type="text" name="affiliationNumber" />
              </AvGroup>
              <AvGroup>
                <Label for="insurance-consultation">
                  <Translate contentKey="mediGoApp.insurance.consultation">Consultation</Translate>
                </Label>
                <AvInput id="insurance-consultation" type="select" className="form-control" name="consultation.id">
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
              <Button tag={Link} id="cancel-save" to="/insurance" replace color="info">
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
  insuranceEntity: storeState.insurance.entity,
  loading: storeState.insurance.loading,
  updating: storeState.insurance.updating,
  updateSuccess: storeState.insurance.updateSuccess
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

export default connect(mapStateToProps, mapDispatchToProps)(InsuranceUpdate);
