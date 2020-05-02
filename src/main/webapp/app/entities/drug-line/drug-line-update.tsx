import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IDrug } from 'app/shared/model/drug.model';
import { getEntities as getDrugs } from 'app/entities/drug/drug.reducer';
import { IPrescription } from 'app/shared/model/prescription.model';
import { getEntities as getPrescriptions } from 'app/entities/prescription/prescription.reducer';
import { getEntity, updateEntity, createEntity, reset } from './drug-line.reducer';
import { IDrugLine } from 'app/shared/model/drug-line.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDrugLineUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DrugLineUpdate = (props: IDrugLineUpdateProps) => {
  const [drugId, setDrugId] = useState('0');
  const [prescriptionId, setPrescriptionId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { drugLineEntity, drugs, prescriptions, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/drug-line');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getDrugs();
    props.getPrescriptions();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...drugLineEntity,
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
          <h2 id="mediGoApp.drugLine.home.createOrEditLabel">
            <Translate contentKey="mediGoApp.drugLine.home.createOrEditLabel">Create or edit a DrugLine</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : drugLineEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="drug-line-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="drug-line-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="doseMatinLabel" for="drug-line-doseMatin">
                  <Translate contentKey="mediGoApp.drugLine.doseMatin">Dose Matin</Translate>
                </Label>
                <AvField id="drug-line-doseMatin" type="string" className="form-control" name="doseMatin" />
              </AvGroup>
              <AvGroup>
                <Label id="doseMidiLabel" for="drug-line-doseMidi">
                  <Translate contentKey="mediGoApp.drugLine.doseMidi">Dose Midi</Translate>
                </Label>
                <AvField id="drug-line-doseMidi" type="string" className="form-control" name="doseMidi" />
              </AvGroup>
              <AvGroup>
                <Label id="doseSoirLabel" for="drug-line-doseSoir">
                  <Translate contentKey="mediGoApp.drugLine.doseSoir">Dose Soir</Translate>
                </Label>
                <AvField id="drug-line-doseSoir" type="string" className="form-control" name="doseSoir" />
              </AvGroup>
              <AvGroup>
                <Label id="afterBeforeLabel" for="drug-line-afterBefore">
                  <Translate contentKey="mediGoApp.drugLine.afterBefore">After Before</Translate>
                </Label>
                <AvField id="drug-line-afterBefore" type="text" name="afterBefore" />
              </AvGroup>
              <AvGroup>
                <Label id="durationLabel" for="drug-line-duration">
                  <Translate contentKey="mediGoApp.drugLine.duration">Duration</Translate>
                </Label>
                <AvField id="drug-line-duration" type="string" className="form-control" name="duration" />
              </AvGroup>
              <AvGroup>
                <Label for="drug-line-drug">
                  <Translate contentKey="mediGoApp.drugLine.drug">Drug</Translate>
                </Label>
                <AvInput id="drug-line-drug" type="select" className="form-control" name="drug.id">
                  <option value="" key="0" />
                  {drugs
                    ? drugs.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="drug-line-prescription">
                  <Translate contentKey="mediGoApp.drugLine.prescription">Prescription</Translate>
                </Label>
                <AvInput id="drug-line-prescription" type="select" className="form-control" name="prescription.id">
                  <option value="" key="0" />
                  {prescriptions
                    ? prescriptions.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/drug-line" replace color="info">
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
  drugs: storeState.drug.entities,
  prescriptions: storeState.prescription.entities,
  drugLineEntity: storeState.drugLine.entity,
  loading: storeState.drugLine.loading,
  updating: storeState.drugLine.updating,
  updateSuccess: storeState.drugLine.updateSuccess
});

const mapDispatchToProps = {
  getDrugs,
  getPrescriptions,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DrugLineUpdate);
