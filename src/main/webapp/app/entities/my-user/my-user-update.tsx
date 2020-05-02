import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './my-user.reducer';
import { IMyUser } from 'app/shared/model/my-user.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IMyUserUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const MyUserUpdate = (props: IMyUserUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { myUserEntity, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/my-user');
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
        ...myUserEntity,
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
          <h2 id="mediGoApp.myUser.home.createOrEditLabel">
            <Translate contentKey="mediGoApp.myUser.home.createOrEditLabel">Create or edit a MyUser</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : myUserEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="my-user-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="my-user-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="usernameLabel" for="my-user-username">
                  <Translate contentKey="mediGoApp.myUser.username">Username</Translate>
                </Label>
                <AvField id="my-user-username" type="text" name="username" />
              </AvGroup>
              <AvGroup>
                <Label id="passwordLabel" for="my-user-password">
                  <Translate contentKey="mediGoApp.myUser.password">Password</Translate>
                </Label>
                <AvField id="my-user-password" type="text" name="password" />
              </AvGroup>
              <AvGroup>
                <Label id="emailLabel" for="my-user-email">
                  <Translate contentKey="mediGoApp.myUser.email">Email</Translate>
                </Label>
                <AvField id="my-user-email" type="text" name="email" />
              </AvGroup>
              <AvGroup check>
                <Label id="activeLabel">
                  <AvInput id="my-user-active" type="checkbox" className="form-check-input" name="active" />
                  <Translate contentKey="mediGoApp.myUser.active">Active</Translate>
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="firstNameLabel" for="my-user-firstName">
                  <Translate contentKey="mediGoApp.myUser.firstName">First Name</Translate>
                </Label>
                <AvField id="my-user-firstName" type="text" name="firstName" />
              </AvGroup>
              <AvGroup>
                <Label id="lastNameLabel" for="my-user-lastName">
                  <Translate contentKey="mediGoApp.myUser.lastName">Last Name</Translate>
                </Label>
                <AvField id="my-user-lastName" type="text" name="lastName" />
              </AvGroup>
              <AvGroup>
                <Label id="cinLabel" for="my-user-cin">
                  <Translate contentKey="mediGoApp.myUser.cin">Cin</Translate>
                </Label>
                <AvField id="my-user-cin" type="text" name="cin" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/my-user" replace color="info">
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
  myUserEntity: storeState.myUser.entity,
  loading: storeState.myUser.loading,
  updating: storeState.myUser.updating,
  updateSuccess: storeState.myUser.updateSuccess
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MyUserUpdate);
