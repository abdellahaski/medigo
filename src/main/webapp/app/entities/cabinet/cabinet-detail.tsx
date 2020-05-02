import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './cabinet.reducer';
import { ICabinet } from 'app/shared/model/cabinet.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICabinetDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CabinetDetail = (props: ICabinetDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { cabinetEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="mediGoApp.cabinet.detail.title">Cabinet</Translate> [<b>{cabinetEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="name">
              <Translate contentKey="mediGoApp.cabinet.name">Name</Translate>
            </span>
          </dt>
          <dd>{cabinetEntity.name}</dd>
          <dt>
            <span id="address">
              <Translate contentKey="mediGoApp.cabinet.address">Address</Translate>
            </span>
          </dt>
          <dd>{cabinetEntity.address}</dd>
          <dt>
            <span id="coordinates">
              <Translate contentKey="mediGoApp.cabinet.coordinates">Coordinates</Translate>
            </span>
          </dt>
          <dd>{cabinetEntity.coordinates}</dd>
          <dt>
            <span id="speciality">
              <Translate contentKey="mediGoApp.cabinet.speciality">Speciality</Translate>
            </span>
          </dt>
          <dd>{cabinetEntity.speciality}</dd>
        </dl>
        <Button tag={Link} to="/cabinet" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/cabinet/${cabinetEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ cabinet }: IRootState) => ({
  cabinetEntity: cabinet.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CabinetDetail);
