import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IDrugLine, defaultValue } from 'app/shared/model/drug-line.model';

export const ACTION_TYPES = {
  FETCH_DRUGLINE_LIST: 'drugLine/FETCH_DRUGLINE_LIST',
  FETCH_DRUGLINE: 'drugLine/FETCH_DRUGLINE',
  CREATE_DRUGLINE: 'drugLine/CREATE_DRUGLINE',
  UPDATE_DRUGLINE: 'drugLine/UPDATE_DRUGLINE',
  DELETE_DRUGLINE: 'drugLine/DELETE_DRUGLINE',
  RESET: 'drugLine/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IDrugLine>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type DrugLineState = Readonly<typeof initialState>;

// Reducer

export default (state: DrugLineState = initialState, action): DrugLineState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_DRUGLINE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_DRUGLINE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_DRUGLINE):
    case REQUEST(ACTION_TYPES.UPDATE_DRUGLINE):
    case REQUEST(ACTION_TYPES.DELETE_DRUGLINE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_DRUGLINE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_DRUGLINE):
    case FAILURE(ACTION_TYPES.CREATE_DRUGLINE):
    case FAILURE(ACTION_TYPES.UPDATE_DRUGLINE):
    case FAILURE(ACTION_TYPES.DELETE_DRUGLINE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_DRUGLINE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_DRUGLINE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_DRUGLINE):
    case SUCCESS(ACTION_TYPES.UPDATE_DRUGLINE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_DRUGLINE):
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

const apiUrl = 'api/drug-lines';

// Actions

export const getEntities: ICrudGetAllAction<IDrugLine> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_DRUGLINE_LIST,
  payload: axios.get<IDrugLine>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IDrugLine> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_DRUGLINE,
    payload: axios.get<IDrugLine>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IDrugLine> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_DRUGLINE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IDrugLine> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_DRUGLINE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IDrugLine> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_DRUGLINE,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
