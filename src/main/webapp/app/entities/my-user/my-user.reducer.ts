import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IMyUser, defaultValue } from 'app/shared/model/my-user.model';

export const ACTION_TYPES = {
  FETCH_MYUSER_LIST: 'myUser/FETCH_MYUSER_LIST',
  FETCH_MYUSER: 'myUser/FETCH_MYUSER',
  CREATE_MYUSER: 'myUser/CREATE_MYUSER',
  UPDATE_MYUSER: 'myUser/UPDATE_MYUSER',
  DELETE_MYUSER: 'myUser/DELETE_MYUSER',
  RESET: 'myUser/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IMyUser>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type MyUserState = Readonly<typeof initialState>;

// Reducer

export default (state: MyUserState = initialState, action): MyUserState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_MYUSER_LIST):
    case REQUEST(ACTION_TYPES.FETCH_MYUSER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_MYUSER):
    case REQUEST(ACTION_TYPES.UPDATE_MYUSER):
    case REQUEST(ACTION_TYPES.DELETE_MYUSER):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_MYUSER_LIST):
    case FAILURE(ACTION_TYPES.FETCH_MYUSER):
    case FAILURE(ACTION_TYPES.CREATE_MYUSER):
    case FAILURE(ACTION_TYPES.UPDATE_MYUSER):
    case FAILURE(ACTION_TYPES.DELETE_MYUSER):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_MYUSER_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_MYUSER):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_MYUSER):
    case SUCCESS(ACTION_TYPES.UPDATE_MYUSER):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_MYUSER):
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

const apiUrl = 'api/my-users';

// Actions

export const getEntities: ICrudGetAllAction<IMyUser> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_MYUSER_LIST,
  payload: axios.get<IMyUser>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IMyUser> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_MYUSER,
    payload: axios.get<IMyUser>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IMyUser> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_MYUSER,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IMyUser> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_MYUSER,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IMyUser> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_MYUSER,
    payload: axios.delete(requestUrl)
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
