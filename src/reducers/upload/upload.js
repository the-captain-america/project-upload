import {
  uploadTypes,
} from 'types';

const INITIAL_STATE = {
  items: [],
  isLoading: false,
};

export default (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case uploadTypes.UPLOAD_ITEMS:
      return Object.assign({}, state, { items: [...state, action.payload] });
    case uploadTypes.UPLOAD_ITEM_SUCCESS:
      return Object.assign({}, state, { isLoading: true });
    default:
      return state;
  }
};

