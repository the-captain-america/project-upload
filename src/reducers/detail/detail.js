import {
  detailTypes,
} from 'types';

const INITIAL_STATE = {
  firstname: '',
  lastname: '',
  dob: '',
  address: '',
  passport: '',
  isLoggedIn: false,
};

export default (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case detailTypes.SAVE_DETAIL:
      return Object.assign({}, state, action.payload);
    case detailTypes.SAVE_DETAIL_SUCCESS:
      return Object.assign({}, state, { isLoggedIn: true });
    case detailTypes.SAVE_DETAIL_FAILURE:
      return Object.assign({}, state, { isLoggedIn: false });
    default:
      return state;
  }
};

