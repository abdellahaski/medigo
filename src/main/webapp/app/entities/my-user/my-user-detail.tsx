import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './my-user.reducer';
import { IMyUser } from 'app/shared/model/my-user.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMyUserDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const MyUserDetail = (props: IMyUserDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { myUserEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="mediGoApp.myUser.detail.title">MyUser</Translate> [<b>{myUserEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="username">
              <Translate contentKey="mediGoApp.myUser.username">Username</Translate>
            </span>
          </dt>
          <dd>{myUserEntity.username}</dd>
          <dt>
            <span id="password">
              <Translate contentKey="mediGoApp.myUser.password">Password</Translate>
            </span>
          </dt>
          <dd>{myUserEntity.password}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="mediGoApp.myUser.email">Email</Translate>
            </span>
          </dt>
          <dd>{myUserEntity.email}</dd>
          <dt>
            <span id="active">
              <Translate contentKey="mediGoApp.myUser.active">Active</Translate>
            </span>
          </dt>
          <dd>{myUserEntity.active ? 'true' : 'false'}</dd>
          <dt>
            <span id="firstName">
              <Translate contentKey="mediGoApp.myUser.firstName">First Name</Translate>
            </span>
          </dt>
          <dd>{myUserEntity.firstName}</dd>
          <dt>
            <span id="lastName">
              <Translate contentKey="mediGoApp.myUser.lastName">Last Name</Translate>
            </span>
          </dt>
          <dd>{myUserEntity.lastName}</dd>
          <dt>
            <span id="cin">
              <Translate contentKey="mediGoApp.myUser.cin">Cin</Translate>
            </span>
          </dt>
          <dd>{myUserEntity.cin}</dd>
          <dt>
            <span id="type">
              <Translate contentKey="mediGoApp.myUser.type">Type</Translate>
            </span>
          </dt>
          <dd>{myUserEntity.type}</dd>
          <dt>
            <span id="currentInsurance">
              <Translate contentKey="mediGoApp.myUser.currentInsurance">Current Insurance</Translate>
            </span>
          </dt>
          <dd>{myUserEntity.currentInsurance}</dd>
          <dt>
            <Translate contentKey="mediGoApp.myUser.doctorCabinet">Doctor Cabinet</Translate>
          </dt>
          <dd>{myUserEntity.doctorCabinet ? myUserEntity.doctorCabinet.id : ''}</dd>
          <dt>
            <Translate contentKey="mediGoApp.myUser.assistantCabinet">Assistant Cabinet</Translate>
          </dt>
          <dd>{myUserEntity.assistantCabinet ? myUserEntity.assistantCabinet.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/my-user" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/my-user/${myUserEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ myUser }: IRootState) => ({
  myUserEntity: myUser.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MyUserDetail);
