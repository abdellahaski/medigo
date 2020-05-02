import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './custom-line.reducer';
import { ICustomLine } from 'app/shared/model/custom-line.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICustomLineProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const CustomLine = (props: ICustomLineProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { customLineList, match, loading } = props;
  return (
    <div>
      <h2 id="custom-line-heading">
        <Translate contentKey="mediGoApp.customLine.home.title">Custom Lines</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="mediGoApp.customLine.home.createLabel">Create new Custom Line</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {customLineList && customLineList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="mediGoApp.customLine.content">Content</Translate>
                </th>
                <th>
                  <Translate contentKey="mediGoApp.customLine.prescription">Prescription</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {customLineList.map((customLine, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${customLine.id}`} color="link" size="sm">
                      {customLine.id}
                    </Button>
                  </td>
                  <td>{customLine.content}</td>
                  <td>
                    {customLine.prescription ? (
                      <Link to={`prescription/${customLine.prescription.id}`}>{customLine.prescription.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${customLine.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${customLine.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${customLine.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="mediGoApp.customLine.home.notFound">No Custom Lines found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ customLine }: IRootState) => ({
  customLineList: customLine.entities,
  loading: customLine.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CustomLine);
