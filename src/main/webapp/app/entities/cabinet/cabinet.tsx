import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './cabinet.reducer';
import { ICabinet } from 'app/shared/model/cabinet.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICabinetProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Cabinet = (props: ICabinetProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { cabinetList, match, loading } = props;
  return (
    <div>
      <h2 id="cabinet-heading">
        <Translate contentKey="mediGoApp.cabinet.home.title">Cabinets</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="mediGoApp.cabinet.home.createLabel">Create new Cabinet</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {cabinetList && cabinetList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="mediGoApp.cabinet.name">Name</Translate>
                </th>
                <th>
                  <Translate contentKey="mediGoApp.cabinet.address">Address</Translate>
                </th>
                <th>
                  <Translate contentKey="mediGoApp.cabinet.coordinates">Coordinates</Translate>
                </th>
                <th>
                  <Translate contentKey="mediGoApp.cabinet.speciality">Speciality</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {cabinetList.map((cabinet, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${cabinet.id}`} color="link" size="sm">
                      {cabinet.id}
                    </Button>
                  </td>
                  <td>{cabinet.name}</td>
                  <td>{cabinet.address}</td>
                  <td>{cabinet.coordinates}</td>
                  <td>{cabinet.speciality}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${cabinet.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${cabinet.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${cabinet.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="mediGoApp.cabinet.home.notFound">No Cabinets found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ cabinet }: IRootState) => ({
  cabinetList: cabinet.entities,
  loading: cabinet.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Cabinet);
