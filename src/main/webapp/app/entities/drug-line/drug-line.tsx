import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './drug-line.reducer';
import { IDrugLine } from 'app/shared/model/drug-line.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDrugLineProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const DrugLine = (props: IDrugLineProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { drugLineList, match, loading } = props;
  return (
    <div>
      <h2 id="drug-line-heading">
        <Translate contentKey="mediGoApp.drugLine.home.title">Drug Lines</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="mediGoApp.drugLine.home.createLabel">Create new Drug Line</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {drugLineList && drugLineList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="mediGoApp.drugLine.doseMatin">Dose Matin</Translate>
                </th>
                <th>
                  <Translate contentKey="mediGoApp.drugLine.doseMidi">Dose Midi</Translate>
                </th>
                <th>
                  <Translate contentKey="mediGoApp.drugLine.doseSoir">Dose Soir</Translate>
                </th>
                <th>
                  <Translate contentKey="mediGoApp.drugLine.afterBefore">After Before</Translate>
                </th>
                <th>
                  <Translate contentKey="mediGoApp.drugLine.duration">Duration</Translate>
                </th>
                <th>
                  <Translate contentKey="mediGoApp.drugLine.drug">Drug</Translate>
                </th>
                <th>
                  <Translate contentKey="mediGoApp.drugLine.prescription">Prescription</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {drugLineList.map((drugLine, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${drugLine.id}`} color="link" size="sm">
                      {drugLine.id}
                    </Button>
                  </td>
                  <td>{drugLine.doseMatin}</td>
                  <td>{drugLine.doseMidi}</td>
                  <td>{drugLine.doseSoir}</td>
                  <td>{drugLine.afterBefore}</td>
                  <td>{drugLine.duration}</td>
                  <td>{drugLine.drug ? <Link to={`drug/${drugLine.drug.id}`}>{drugLine.drug.id}</Link> : ''}</td>
                  <td>
                    {drugLine.prescription ? <Link to={`prescription/${drugLine.prescription.id}`}>{drugLine.prescription.id}</Link> : ''}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${drugLine.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${drugLine.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${drugLine.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="mediGoApp.drugLine.home.notFound">No Drug Lines found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ drugLine }: IRootState) => ({
  drugLineList: drugLine.entities,
  loading: drugLine.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DrugLine);
