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
import { getEntity, updateEntity, createEntity, reset } from './one-string.reducer';
import { IOneString } from 'app/shared/model/one-string.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IOneStringUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const OneStringUpdate = (props: IOneStringUpdateProps) => {
  const [drugId, setDrugId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { oneStringEntity, drugs, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/one-string');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getDrugs();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...oneStringEntity,
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
          <h2 id="mediGoApp.oneString.home.createOrEditLabel">
            <Translate contentKey="mediGoApp.oneString.home.createOrEditLabel">Create or edit a OneString</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : oneStringEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="one-string-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="one-string-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="contentLabel" for="one-string-content">
                  <Translate contentKey="mediGoApp.oneString.content">Content</Translate>
                </Label>
                <AvField id="one-string-content" type="text" name="content" />
              </AvGroup>
              <AvGroup>
                <Label for="one-string-drug">
                  <Translate contentKey="mediGoApp.oneString.drug">Drug</Translate>
                </Label>
                <AvInput id="one-string-drug" type="select" className="form-control" name="drug.id">
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
              <Button tag={Link} id="cancel-save" to="/one-string" replace color="info">
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
  oneStringEntity: storeState.oneString.entity,
  loading: storeState.oneString.loading,
  updating: storeState.oneString.updating,
  updateSuccess: storeState.oneString.updateSuccess
});

const mapDispatchToProps = {
  getDrugs,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(OneStringUpdate);
