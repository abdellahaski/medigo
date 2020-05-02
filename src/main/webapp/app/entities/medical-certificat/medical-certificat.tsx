import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './medical-certificat.reducer';
import { IMedicalCertificat } from 'app/shared/model/medical-certificat.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMedicalCertificatProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const MedicalCertificat = (props: IMedicalCertificatProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { medicalCertificatList, match, loading } = props;
  return (
    <div>
      <h2 id="medical-certificat-heading">
        <Translate contentKey="mediGoApp.medicalCertificat.home.title">Medical Certificats</Translate>
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp;
          <Translate contentKey="mediGoApp.medicalCertificat.home.createLabel">Create new Medical Certificat</Translate>
        </Link>
      </h2>
      <div className="table-responsive">
        {medicalCertificatList && medicalCertificatList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="mediGoApp.medicalCertificat.date">Date</Translate>
                </th>
                <th>
                  <Translate contentKey="mediGoApp.medicalCertificat.startDate">Start Date</Translate>
                </th>
                <th>
                  <Translate contentKey="mediGoApp.medicalCertificat.endDate">End Date</Translate>
                </th>
                <th>
                  <Translate contentKey="mediGoApp.medicalCertificat.days">Days</Translate>
                </th>
                <th>
                  <Translate contentKey="mediGoApp.medicalCertificat.urlId">Url Id</Translate>
                </th>
                <th>
                  <Translate contentKey="mediGoApp.medicalCertificat.consultation">Consultation</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {medicalCertificatList.map((medicalCertificat, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${medicalCertificat.id}`} color="link" size="sm">
                      {medicalCertificat.id}
                    </Button>
                  </td>
                  <td>
                    <TextFormat type="date" value={medicalCertificat.date} format={APP_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={medicalCertificat.startDate} format={APP_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={medicalCertificat.endDate} format={APP_DATE_FORMAT} />
                  </td>
                  <td>{medicalCertificat.days}</td>
                  <td>{medicalCertificat.urlId}</td>
                  <td>
                    {medicalCertificat.consultation ? (
                      <Link to={`consultation/${medicalCertificat.consultation.id}`}>{medicalCertificat.consultation.id}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${medicalCertificat.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${medicalCertificat.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${medicalCertificat.id}/delete`} color="danger" size="sm">
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
              <Translate contentKey="mediGoApp.medicalCertificat.home.notFound">No Medical Certificats found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ medicalCertificat }: IRootState) => ({
  medicalCertificatList: medicalCertificat.entities,
  loading: medicalCertificat.loading
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(MedicalCertificat);
