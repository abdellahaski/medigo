import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './prescription.reducer';
import { IPrescription } from 'app/shared/model/prescription.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPrescriptionDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PrescriptionDetail = (props: IPrescriptionDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { prescriptionEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="mediGoApp.prescription.detail.title">Prescription</Translate> [<b>{prescriptionEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="date">
              <Translate contentKey="mediGoApp.prescription.date">Date</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={prescriptionEntity.date} type="date" format={APP_DATE_FORMAT} />
          </dd>
          <dt>
            <Translate contentKey="mediGoApp.prescription.consultation">Consultation</Translate>
          </dt>
          <dd>{prescriptionEntity.consultation ? prescriptionEntity.consultation.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/prescription" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/prescription/${prescriptionEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ prescription }: IRootState) => ({
  prescriptionEntity: prescription.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PrescriptionDetail);
