import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './consultation.reducer';
import { IConsultation } from 'app/shared/model/consultation.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IConsultationDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ConsultationDetail = (props: IConsultationDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { consultationEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="mediGoApp.consultation.detail.title">Consultation</Translate> [<b>{consultationEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="type">
              <Translate contentKey="mediGoApp.consultation.type">Type</Translate>
            </span>
          </dt>
          <dd>{consultationEntity.type}</dd>
          <dt>
            <span id="cost">
              <Translate contentKey="mediGoApp.consultation.cost">Cost</Translate>
            </span>
          </dt>
          <dd>{consultationEntity.cost}</dd>
          <dt>
            <span id="advance">
              <Translate contentKey="mediGoApp.consultation.advance">Advance</Translate>
            </span>
          </dt>
          <dd>{consultationEntity.advance}</dd>
          <dt>
            <Translate contentKey="mediGoApp.consultation.doctor">Doctor</Translate>
          </dt>
          <dd>{consultationEntity.doctor ? consultationEntity.doctor.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/consultation" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/consultation/${consultationEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ consultation }: IRootState) => ({
  consultationEntity: consultation.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ConsultationDetail);
