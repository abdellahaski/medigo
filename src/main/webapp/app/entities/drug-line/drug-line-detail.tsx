import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './drug-line.reducer';
import { IDrugLine } from 'app/shared/model/drug-line.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDrugLineDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DrugLineDetail = (props: IDrugLineDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { drugLineEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="mediGoApp.drugLine.detail.title">DrugLine</Translate> [<b>{drugLineEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="doseMatin">
              <Translate contentKey="mediGoApp.drugLine.doseMatin">Dose Matin</Translate>
            </span>
          </dt>
          <dd>{drugLineEntity.doseMatin}</dd>
          <dt>
            <span id="doseMidi">
              <Translate contentKey="mediGoApp.drugLine.doseMidi">Dose Midi</Translate>
            </span>
          </dt>
          <dd>{drugLineEntity.doseMidi}</dd>
          <dt>
            <span id="doseSoir">
              <Translate contentKey="mediGoApp.drugLine.doseSoir">Dose Soir</Translate>
            </span>
          </dt>
          <dd>{drugLineEntity.doseSoir}</dd>
          <dt>
            <span id="afterBefore">
              <Translate contentKey="mediGoApp.drugLine.afterBefore">After Before</Translate>
            </span>
          </dt>
          <dd>{drugLineEntity.afterBefore}</dd>
          <dt>
            <span id="duration">
              <Translate contentKey="mediGoApp.drugLine.duration">Duration</Translate>
            </span>
          </dt>
          <dd>{drugLineEntity.duration}</dd>
          <dt>
            <Translate contentKey="mediGoApp.drugLine.drug">Drug</Translate>
          </dt>
          <dd>{drugLineEntity.drug ? drugLineEntity.drug.id : ''}</dd>
          <dt>
            <Translate contentKey="mediGoApp.drugLine.prescription">Prescription</Translate>
          </dt>
          <dd>{drugLineEntity.prescription ? drugLineEntity.prescription.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/drug-line" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/drug-line/${drugLineEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ drugLine }: IRootState) => ({
  drugLineEntity: drugLine.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DrugLineDetail);
