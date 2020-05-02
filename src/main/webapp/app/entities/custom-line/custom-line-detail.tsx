import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './custom-line.reducer';
import { ICustomLine } from 'app/shared/model/custom-line.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICustomLineDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CustomLineDetail = (props: ICustomLineDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { customLineEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="mediGoApp.customLine.detail.title">CustomLine</Translate> [<b>{customLineEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="content">
              <Translate contentKey="mediGoApp.customLine.content">Content</Translate>
            </span>
          </dt>
          <dd>{customLineEntity.content}</dd>
          <dt>
            <Translate contentKey="mediGoApp.customLine.prescription">Prescription</Translate>
          </dt>
          <dd>{customLineEntity.prescription ? customLineEntity.prescription.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/custom-line" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/custom-line/${customLineEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ customLine }: IRootState) => ({
  customLineEntity: customLine.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CustomLineDetail);
