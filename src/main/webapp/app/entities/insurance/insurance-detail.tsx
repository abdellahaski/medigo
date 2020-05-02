import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './insurance.reducer';
import { IInsurance } from 'app/shared/model/insurance.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IInsuranceDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const InsuranceDetail = (props: IInsuranceDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { insuranceEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="mediGoApp.insurance.detail.title">Insurance</Translate> [<b>{insuranceEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="company">
              <Translate contentKey="mediGoApp.insurance.company">Company</Translate>
            </span>
          </dt>
          <dd>{insuranceEntity.company}</dd>
          <dt>
            <span id="affiliationNumber">
              <Translate contentKey="mediGoApp.insurance.affiliationNumber">Affiliation Number</Translate>
            </span>
          </dt>
          <dd>{insuranceEntity.affiliationNumber}</dd>
          <dt>
            <Translate contentKey="mediGoApp.insurance.consultation">Consultation</Translate>
          </dt>
          <dd>{insuranceEntity.consultation ? insuranceEntity.consultation.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/insurance" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/insurance/${insuranceEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ insurance }: IRootState) => ({
  insuranceEntity: insurance.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(InsuranceDetail);
