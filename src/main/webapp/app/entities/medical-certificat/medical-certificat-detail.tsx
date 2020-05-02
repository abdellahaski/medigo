import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './medical-certificat.reducer';
import { IMedicalCertificat } from 'app/shared/model/medical-certificat.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMedicalCertificatDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const MedicalCertificatDetail = (props: IMedicalCertificatDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { medicalCertificatEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="mediGoApp.medicalCertificat.detail.title">MedicalCertificat</Translate> [
          <b>{medicalCertificatEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="date">
              <Translate contentKey="mediGoApp.medicalCertificat.date">Date</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={medicalCertificatEntity.date} type="date" format={APP_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="startDate">
              <Translate contentKey="mediGoApp.medicalCertificat.startDate">Start Date</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={medicalCertificatEntity.startDate} type="date" format={APP_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="endDate">
              <Translate contentKey="mediGoApp.medicalCertificat.endDate">End Date</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={medicalCertificatEntity.endDate} type="date" format={APP_DATE_FORMAT} />
          </dd>
          <dt>
            <span id="days">
              <Translate contentKey="mediGoApp.medicalCertificat.days">Days</Translate>
            </span>
          </dt>
          <dd>{medicalCertificatEntity.days}</dd>
          <dt>
            <span id="urlId">
              <Translate contentKey="mediGoApp.medicalCertificat.urlId">Url Id</Translate>
            </span>
          </dt>
          <dd>{medicalCertificatEntity.urlId}</dd>
          <dt>
            <Translate contentKey="mediGoApp.medicalCertificat.consultation">Consultation</Translate>
          </dt>
          <dd>{medicalCertificatEntity.consultation ? medicalCertificatEntity.consultation.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/medical-certificat" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/medical-certificat/${medicalCertificatEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ medicalCertificat }: IRootState) => ({
  medicalCertificatEntity: medicalCertificat.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MedicalCertificatDetail);
