import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IOneString, defaultValue } from 'app/shared/model/one-string.model';

export const ACTION_TYPES = {
  FETCH_ONESTRING_LIST: 'oneString/FETCH_ONESTRING_LIST',
  FETCH_ONESTRING: 'oneString/FETCH_ONESTRING',
  CREATE_ONESTRING: 'oneString/CREATE_ONESTRING',
  UPDATE_ONESTRING: 'oneString/UPDATE_ONESTRING',
  DELETE_ONESTRING: 'oneString/DELETE_ONESTRING',
  RESET: 'oneString/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IOneString>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type OneStringState = Readonly<typeof initialState>;

// Reducer

export default (state: OneStringState = initialState, action): OneStringState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ONESTRING_LIST):
    case REQUEST(ACTION_TYPES.FETCH_ONESTRING):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_ONESTRING):
    case REQUEST(ACTION_TYPES.UPDATE_ONESTRING):
    case REQUEST(ACTION_TYPES.DELETE_ONESTRING):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_ONESTRING_LIST):
    case FAILURE(ACTION_TYPES.FETCH_ONESTRING):
    case FAILURE(ACTION_TYPES.CREATE_ONESTRING):
    case FAILURE(ACTION_TYPES.UPDATE_ONESTRING):
    case FAILURE(ACTION_TYPES.DELETE_ONESTRING):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_ONESTRING_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_ONESTRING):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_ONESTRING):
    case SUCCESS(ACTION_TYPES.UPDATE_ONESTRING):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_ONESTRING):
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

const apiUrl = 'api/one-strings';

// Actions

export const getEntities: ICrudGetAllAction<IOneString> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_ONESTRING_LIST,
  payload: axios.get<IOneString>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IOneString> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_ONESTRING,
    payload: axios.get<IOneString>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IOneString> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_ONESTRING,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IOneString> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ONESTRING,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IOneString> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ONESTRING,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
