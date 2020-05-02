import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IMedicalCertificat, defaultValue } from 'app/shared/model/medical-certificat.model';

export const ACTION_TYPES = {
  FETCH_MEDICALCERTIFICAT_LIST: 'medicalCertificat/FETCH_MEDICALCERTIFICAT_LIST',
  FETCH_MEDICALCERTIFICAT: 'medicalCertificat/FETCH_MEDICALCERTIFICAT',
  CREATE_MEDICALCERTIFICAT: 'medicalCertificat/CREATE_MEDICALCERTIFICAT',
  UPDATE_MEDICALCERTIFICAT: 'medicalCertificat/UPDATE_MEDICALCERTIFICAT',
  DELETE_MEDICALCERTIFICAT: 'medicalCertificat/DELETE_MEDICALCERTIFICAT',
  RESET: 'medicalCertificat/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IMedicalCertificat>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type MedicalCertificatState = Readonly<typeof initialState>;

// Reducer

export default (state: MedicalCertificatState = initialState, action): MedicalCertificatState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_MEDICALCERTIFICAT_LIST):
    case REQUEST(ACTION_TYPES.FETCH_MEDICALCERTIFICAT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_MEDICALCERTIFICAT):
    case REQUEST(ACTION_TYPES.UPDATE_MEDICALCERTIFICAT):
    case REQUEST(ACTION_TYPES.DELETE_MEDICALCERTIFICAT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_MEDICALCERTIFICAT_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MEDICALCERTIFICAT):
    case FAILURE(ACTION_TYPES.CREATE_MEDICALCERTIFICAT):
    case FAILURE(ACTION_TYPES.UPDATE_MEDICALCERTIFICAT):
    case FAILURE(ACTION_TYPES.DELETE_MEDICALCERTIFICAT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_MEDICALCERTIFICAT_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_MEDICALCERTIFICAT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_MEDICALCERTIFICAT):
    case SUCCESS(ACTION_TYPES.UPDATE_MEDICALCERTIFICAT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_MEDICALCERTIFICAT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/medical-certificats';

// Actions

export const getEntities: ICrudGetAllAction<IMedicalCertificat> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_MEDICALCERTIFICAT_LIST,
  payload: axios.get<IMedicalCertificat>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IMedicalCertificat> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_MEDICALCERTIFICAT,
    payload: axios.get<IMedicalCertificat>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IMedicalCertificat> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MEDICALCERTIFICAT,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IMedicalCertificat> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MEDICALCERTIFICAT,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IMedicalCertificat> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_MEDICALCERTIFICAT,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
