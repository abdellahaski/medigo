import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './one-string.reducer';
import { IOneString } from 'app/shared/model/one-string.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IOneStringDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const OneStringDetail = (props: IOneStringDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { oneStringEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="mediGoApp.oneString.detail.title">OneString</Translate> [<b>{oneStringEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="content">
              <Translate contentKey="mediGoApp.oneString.content">Content</Translate>
            </span>
          </dt>
          <dd>{oneStringEntity.content}</dd>
          <dt>
            <Translate contentKey="mediGoApp.oneString.drug">Drug</Translate>
          </dt>
          <dd>{oneStringEntity.drug ? oneStringEntity.drug.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/one-string" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/one-string/${oneStringEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ oneString }: IRootState) => ({
  oneStringEntity: oneString.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(OneStringDetail);
