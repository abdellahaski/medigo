import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './drug.reducer';
import { IDrug } from 'app/shared/model/drug.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDrugDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DrugDetail = (props: IDrugDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { drugEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="mediGoApp.drug.detail.title">Drug</Translate> [<b>{drugEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="label">
              <Translate contentKey="mediGoApp.drug.label">Label</Translate>
            </span>
          </dt>
          <dd>{drugEntity.label}</dd>
          <dt>
            <span id="type">
              <Translate contentKey="mediGoApp.drug.type">Type</Translate>
            </span>
          </dt>
          <dd>{drugEntity.type}</dd>
          <dt>
            <span id="validated">
              <Translate contentKey="mediGoApp.drug.validated">Validated</Translate>
            </span>
          </dt>
          <dd>{drugEntity.validated ? 'true' : 'false'}</dd>
        </dl>
        <Button tag={Link} to="/drug" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/drug/${drugEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ drug }: IRootState) => ({
  drugEntity: drug.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DrugDetail);
