import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ICustomLine, defaultValue } from 'app/shared/model/custom-line.model';

export const ACTION_TYPES = {
  FETCH_CUSTOMLINE_LIST: 'customLine/FETCH_CUSTOMLINE_LIST',
  FETCH_CUSTOMLINE: 'customLine/FETCH_CUSTOMLINE',
  CREATE_CUSTOMLINE: 'customLine/CREATE_CUSTOMLINE',
  UPDATE_CUSTOMLINE: 'customLine/UPDATE_CUSTOMLINE',
  DELETE_CUSTOMLINE: 'customLine/DELETE_CUSTOMLINE',
  RESET: 'customLine/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ICustomLine>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type CustomLineState = Readonly<typeof initialState>;

// Reducer

export default (state: CustomLineState = initialState, action): CustomLineState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CUSTOMLINE_LIST):
    case REQUEST(ACTION_TYPES.FETCH_CUSTOMLINE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_CUSTOMLINE):
    case REQUEST(ACTION_TYPES.UPDATE_CUSTOMLINE):
    case REQUEST(ACTION_TYPES.DELETE_CUSTOMLINE):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_CUSTOMLINE_LIST):
    case FAILURE(ACTION_TYPES.FETCH_CUSTOMLINE):
    case FAILURE(ACTION_TYPES.CREATE_CUSTOMLINE):
    case FAILURE(ACTION_TYPES.UPDATE_CUSTOMLINE):
    case FAILURE(ACTION_TYPES.DELETE_CUSTOMLINE):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_CUSTOMLINE_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_CUSTOMLINE):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_CUSTOMLINE):
    case SUCCESS(ACTION_TYPES.UPDATE_CUSTOMLINE):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_CUSTOMLINE):
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

const apiUrl = 'api/custom-lines';

// Actions

export const getEntities: ICrudGetAllAction<ICustomLine> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_CUSTOMLINE_LIST,
  payload: axios.get<ICustomLine>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<ICustomLine> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_CUSTOMLINE,
    payload: axios.get<ICustomLine>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<ICustomLine> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_CUSTOMLINE,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ICustomLine> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_CUSTOMLINE,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ICustomLine> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_CUSTOMLINE,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
