import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './one-string.reducer';
import { IOneString } from 'app/shared/model/one-string.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IOneStringProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const OneString = (props: IOneStringProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { oneStringList, match, loading } = props;
  return (
    <div>
      <h2 id="one-string-heading">
        <Translate contentKey="mediGoApp.oneString.home.title">One Strings</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="mediGoApp.oneString.home.createLabel">Create new One String</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {oneStringList && oneStringList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="mediGoApp.oneString.content">Content</Translate>
                </th>
                <th>
                  <Translate contentKey="mediGoApp.oneString.drug">Drug</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {oneStringList.map((oneString, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${oneString.id}`} color="link" size="sm">
                      {oneString.id}
                    </Button>
                  </td>
                  <td>{oneString.content}</td>
                  <td>{oneString.drug ? <Link to={`drug/${oneString.drug.id}`}>{oneString.drug.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${oneString.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${oneString.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${oneString.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="mediGoApp.oneString.home.notFound">No One Strings found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ oneString }: IRootState) => ({
  oneStringList: oneString.entities,
  loading: oneString.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(OneString);
