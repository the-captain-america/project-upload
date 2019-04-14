import {
  combineReducers,
} from 'redux';

import auth from './auth/auth';
import detail from './detail/detail';
import upload from './upload/upload';

const reducers = combineReducers({
  auth,
  detail,
  upload,
});

export default reducers;
