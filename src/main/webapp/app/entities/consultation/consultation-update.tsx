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
import { getEntity, updateEntity, createEntity, reset } from './consultation.reducer';
import { IConsultation } from 'app/shared/model/consultation.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IConsultationUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ConsultationUpdate = (props: IConsultationUpdateProps) => {
  const [doctorId, setDoctorId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { consultationEntity, myUsers, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/consultation');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getMyUsers();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...consultationEntity,
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
          <h2 id="mediGoApp.consultation.home.createOrEditLabel">
            <Translate contentKey="mediGoApp.consultation.home.createOrEditLabel">Create or edit a Consultation</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : consultationEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="consultation-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="consultation-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="typeLabel" for="consultation-type">
                  <Translate contentKey="mediGoApp.consultation.type">Type</Translate>
                </Label>
                <AvField id="consultation-type" type="text" name="type" />
              </AvGroup>
              <AvGroup>
                <Label id="costLabel" for="consultation-cost">
                  <Translate contentKey="mediGoApp.consultation.cost">Cost</Translate>
                </Label>
                <AvField id="consultation-cost" type="text" name="cost" />
              </AvGroup>
              <AvGroup>
                <Label id="advanceLabel" for="consultation-advance">
                  <Translate contentKey="mediGoApp.consultation.advance">Advance</Translate>
                </Label>
                <AvField id="consultation-advance" type="text" name="advance" />
              </AvGroup>
              <AvGroup>
                <Label for="consultation-doctor">
                  <Translate contentKey="mediGoApp.consultation.doctor">Doctor</Translate>
                </Label>
                <AvInput id="consultation-doctor" type="select" className="form-control" name="doctor.id">
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
              <Button tag={Link} id="cancel-save" to="/consultation" replace color="info">
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
  consultationEntity: storeState.consultation.entity,
  loading: storeState.consultation.loading,
  updating: storeState.consultation.updating,
  updateSuccess: storeState.consultation.updateSuccess
});

const mapDispatchToProps = {
  getMyUsers,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ConsultationUpdate);
