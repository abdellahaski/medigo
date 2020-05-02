import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './drug.reducer';
import { IDrug } from 'app/shared/model/drug.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDrugUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DrugUpdate = (props: IDrugUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { drugEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/drug');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...drugEntity,
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
          <h2 id="mediGoApp.drug.home.createOrEditLabel">
            <Translate contentKey="mediGoApp.drug.home.createOrEditLabel">Create or edit a Drug</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : drugEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="drug-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="drug-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="labelLabel" for="drug-label">
                  <Translate contentKey="mediGoApp.drug.label">Label</Translate>
                </Label>
                <AvField id="drug-label" type="text" name="label" />
              </AvGroup>
              <AvGroup>
                <Label id="typeLabel" for="drug-type">
                  <Translate contentKey="mediGoApp.drug.type">Type</Translate>
                </Label>
                <AvField id="drug-type" type="text" name="type" />
              </AvGroup>
              <AvGroup check>
                <Label id="validatedLabel">
                  <AvInput id="drug-validated" type="checkbox" className="form-check-input" name="validated" />
                  <Translate contentKey="mediGoApp.drug.validated">Validated</Translate>
                </Label>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/drug" replace color="info">
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
  drugEntity: storeState.drug.entity,
  loading: storeState.drug.loading,
  updating: storeState.drug.updating,
  updateSuccess: storeState.drug.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DrugUpdate);
