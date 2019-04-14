import firebase from 'firebase';

import {
  authTypes,
} from 'types';

const loginUserSuccess = user => ({
  type: authTypes.LOGIN_USER_SUCCESS,
  payload: user,
});

const loginUserFailure = error => ({
  type: authTypes.LOGIN_USER_FAIL,
  payload: error,
});

const loginUser = ({ email, password }, firebaseObj) => {
  return (dispatch) => {
    dispatch({
      type: authTypes.LOGIN_USER,
    });
    const firebaseCaller = firebaseObj ? firebaseObj : firebase;
    return firebaseCaller.auth().signInWithEmailAndPassword(email, password)
      .then((user) => {
        dispatch(loginUserSuccess(user));
      }).catch((error) => {
        dispatch(loginUserFailure(error));
      });
  };
};

export default ({ loginUser });
