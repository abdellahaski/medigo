import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './my-user.reducer';
import { IMyUser } from 'app/shared/model/my-user.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMyUserProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const MyUser = (props: IMyUserProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { myUserList, match, loading } = props;
  return (
    <div>
      <h2 id="my-user-heading">
        <Translate contentKey="mediGoApp.myUser.home.title">My Users</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="mediGoApp.myUser.home.createLabel">Create new My User</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {myUserList && myUserList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="mediGoApp.myUser.username">Username</Translate>
                </th>
                <th>
                  <Translate contentKey="mediGoApp.myUser.password">Password</Translate>
                </th>
                <th>
                  <Translate contentKey="mediGoApp.myUser.email">Email</Translate>
                </th>
                <th>
                  <Translate contentKey="mediGoApp.myUser.active">Active</Translate>
                </th>
                <th>
                  <Translate contentKey="mediGoApp.myUser.firstName">First Name</Translate>
                </th>
                <th>
                  <Translate contentKey="mediGoApp.myUser.lastName">Last Name</Translate>
                </th>
                <th>
                  <Translate contentKey="mediGoApp.myUser.cin">Cin</Translate>
                </th>
                <th>
                  <Translate contentKey="mediGoApp.myUser.type">Type</Translate>
                </th>
                <th>
                  <Translate contentKey="mediGoApp.myUser.currentInsurance">Current Insurance</Translate>
                </th>
                <th>
                  <Translate contentKey="mediGoApp.myUser.cabinet">Cabinet</Translate>
                </th>
                <th>
                  <Translate contentKey="mediGoApp.myUser.cabinet">Cabinet</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {myUserList.map((myUser, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${myUser.id}`} color="link" size="sm">
                      {myUser.id}
                    </Button>
                  </td>
                  <td>{myUser.username}</td>
                  <td>{myUser.password}</td>
                  <td>{myUser.email}</td>
                  <td>{myUser.active ? 'true' : 'false'}</td>
                  <td>{myUser.firstName}</td>
                  <td>{myUser.lastName}</td>
                  <td>{myUser.cin}</td>
                  <td>{myUser.type}</td>
                  <td>{myUser.currentInsurance}</td>
                  <td>{myUser.cabinet ? <Link to={`cabinet/${myUser.cabinet.id}`}>{myUser.cabinet.id}</Link> : ''}</td>
                  <td>{myUser.cabinet ? <Link to={`cabinet/${myUser.cabinet.id}`}>{myUser.cabinet.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${myUser.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${myUser.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${myUser.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="mediGoApp.myUser.home.notFound">No My Users found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ myUser }: IRootState) => ({
  myUserList: myUser.entities,
  loading: myUser.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MyUser);
