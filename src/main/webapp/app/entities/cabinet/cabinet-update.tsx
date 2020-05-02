import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './cabinet.reducer';
import { ICabinet } from 'app/shared/model/cabinet.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICabinetUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CabinetUpdate = (props: ICabinetUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { cabinetEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/cabinet');
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
        ...cabinetEntity,
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
          <h2 id="mediGoApp.cabinet.home.createOrEditLabel">
            <Translate contentKey="mediGoApp.cabinet.home.createOrEditLabel">Create or edit a Cabinet</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : cabinetEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="cabinet-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="cabinet-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="nameLabel" for="cabinet-name">
                  <Translate contentKey="mediGoApp.cabinet.name">Name</Translate>
                </Label>
                <AvField id="cabinet-name" type="text" name="name" />
              </AvGroup>
              <AvGroup>
                <Label id="addressLabel" for="cabinet-address">
                  <Translate contentKey="mediGoApp.cabinet.address">Address</Translate>
                </Label>
                <AvField id="cabinet-address" type="text" name="address" />
              </AvGroup>
              <AvGroup>
                <Label id="coordinatesLabel" for="cabinet-coordinates">
                  <Translate contentKey="mediGoApp.cabinet.coordinates">Coordinates</Translate>
                </Label>
                <AvField id="cabinet-coordinates" type="text" name="coordinates" />
              </AvGroup>
              <AvGroup>
                <Label id="specialityLabel" for="cabinet-speciality">
                  <Translate contentKey="mediGoApp.cabinet.speciality">Speciality</Translate>
                </Label>
                <AvField id="cabinet-speciality" type="text" name="speciality" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/cabinet" replace color="info">
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
  cabinetEntity: storeState.cabinet.entity,
  loading: storeState.cabinet.loading,
  updating: storeState.cabinet.updating,
  updateSuccess: storeState.cabinet.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CabinetUpdate);
