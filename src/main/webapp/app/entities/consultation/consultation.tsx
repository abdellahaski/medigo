import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './consultation.reducer';
import { IConsultation } from 'app/shared/model/consultation.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IConsultationProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Consultation = (props: IConsultationProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { consultationList, match, loading } = props;
  return (
    <div>
      <h2 id="consultation-heading">
        <Translate contentKey="mediGoApp.consultation.home.title">Consultations</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="mediGoApp.consultation.home.createLabel">Create new Consultation</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {consultationList && consultationList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="mediGoApp.consultation.type">Type</Translate>
                </th>
                <th>
                  <Translate contentKey="mediGoApp.consultation.cost">Cost</Translate>
                </th>
                <th>
                  <Translate contentKey="mediGoApp.consultation.advance">Advance</Translate>
                </th>
                <th>
                  <Translate contentKey="mediGoApp.consultation.doctor">Doctor</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {consultationList.map((consultation, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${consultation.id}`} color="link" size="sm">
                      {consultation.id}
                    </Button>
                  </td>
                  <td>{consultation.type}</td>
                  <td>{consultation.cost}</td>
                  <td>{consultation.advance}</td>
                  <td>{consultation.doctor ? <Link to={`my-user/${consultation.doctor.id}`}>{consultation.doctor.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${consultation.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${consultation.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${consultation.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="mediGoApp.consultation.home.notFound">No Consultations found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ consultation }: IRootState) => ({
  consultationList: consultation.entities,
  loading: consultation.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Consultation);
