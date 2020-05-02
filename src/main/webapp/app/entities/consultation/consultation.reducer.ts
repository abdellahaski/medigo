import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IConsultation, defaultValue } from 'app/shared/model/consultation.model';

export const ACTION_TYPES = {
  FETCH_CONSULTATION_LIST: 'consultation/FETCH_CONSULTATION_LIST',
  FETCH_CONSULTATION: 'consultation/FETCH_CONSULTATION',
  CREATE_CONSULTATION: 'consultation/CREATE_CONSULTATION',
  UPDATE_CONSULTATION: 'consultation/UPDATE_CONSULTATION',
  DELETE_CONSULTATION: 'consultation/DELETE_CONSULTATION',
  RESET: 'consultation/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IConsultation>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type ConsultationState = Readonly<typeof initialState>;

// Reducer

export default (state: ConsultationState = initialState, action): ConsultationState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CONSULTATION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CONSULTATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CONSULTATION):
    case REQUEST(ACTION_TYPES.UPDATE_CONSULTATION):
    case REQUEST(ACTION_TYPES.DELETE_CONSULTATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CONSULTATION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CONSULTATION):
    case FAILURE(ACTION_TYPES.CREATE_CONSULTATION):
    case FAILURE(ACTION_TYPES.UPDATE_CONSULTATION):
    case FAILURE(ACTION_TYPES.DELETE_CONSULTATION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CONSULTATION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CONSULTATION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CONSULTATION):
    case SUCCESS(ACTION_TYPES.UPDATE_CONSULTATION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CONSULTATION):
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

const apiUrl = 'api/consultations';

// Actions

export const getEntities: ICrudGetAllAction<IConsultation> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CONSULTATION_LIST,
  payload: axios.get<IConsultation>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IConsultation> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CONSULTATION,
    payload: axios.get<IConsultation>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IConsultation> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CONSULTATION,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IConsultation> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CONSULTATION,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IConsultation> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CONSULTATION,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
