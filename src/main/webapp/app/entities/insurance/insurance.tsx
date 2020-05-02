import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './insurance.reducer';
import { IInsurance } from 'app/shared/model/insurance.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IInsuranceProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Insurance = (props: IInsuranceProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { insuranceList, match, loading } = props;
  return (
    <div>
      <h2 id="insurance-heading">
        <Translate contentKey="mediGoApp.insurance.home.title">Insurances</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="mediGoApp.insurance.home.createLabel">Create new Insurance</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {insuranceList && insuranceList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="mediGoApp.insurance.company">Company</Translate>
                </th>
                <th>
                  <Translate contentKey="mediGoApp.insurance.affiliationNumber">Affiliation Number</Translate>
                </th>
                <th>
                  <Translate contentKey="mediGoApp.insurance.consultation">Consultation</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {insuranceList.map((insurance, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${insurance.id}`} color="link" size="sm">
                      {insurance.id}
                    </Button>
                  </td>
                  <td>{insurance.company}</td>
                  <td>{insurance.affiliationNumber}</td>
                  <td>
                    {insurance.consultation ? (
                      <Link to={`consultation/${insurance.consultation.id}`}>{insurance.consultation.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${insurance.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${insurance.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${insurance.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="mediGoApp.insurance.home.notFound">No Insurances found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ insurance }: IRootState) => ({
  insuranceList: insurance.entities,
  loading: insurance.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Insurance);
