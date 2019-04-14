import {
  authTypes,
} from 'types';

const INITIAL_STATE = {
  user: null,
  error: '',
  loading: false,
  loggedIn: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case authTypes.LOGIN_USER:
      return Object.assign({}, state, { loading: true });
    case authTypes.LOGIN_USER_SUCCESS:
      return Object.assign({}, state, { error: '', user: action.payload, loggedIn: true });
    case authTypes.LOGIN_USER_FAIL:
      return Object.assign({}, state, { error: 'Authentication Failed', loading: false, loggedIn: false });
    default:
      return state;
  }
};
