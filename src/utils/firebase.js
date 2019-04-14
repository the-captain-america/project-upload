import firebase from 'firebase';

// had issue with latest firebase setup for v2
const config = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
};

firebase.initializeApp(config);
export const firebaseApp = firebase.initializeApp(config);
export const firebaseAuth = firebaseApp.auth();
export const firebaseDb = firebaseApp.database();

const FireBaseTools = {

  getProvider: (provider) => {
    switch (provider) {
      case 'email':
        return new firebase.auth.EmailAuthProvider();
      case 'facebook':
        return new firebase.auth.FacebookAuthProvider();
      default:
        throw new Error('Provider is not supported!!!');
    }
  },

  loginWithProvider: (p) => {
    const provider = FireBaseTools.getProvider(p);
    return firebaseAuth.signInWithPopup(provider).then(firebaseAuth.currentUser).catch(error => ({
      errorCode: error.code,
      errorMessage: error.message,
    }));
  },

  registerUser: user => firebaseAuth.createUserWithEmailAndPassword(user.email, user.password)
    .then(userInfo => userInfo)
    .catch(error => ({
      errorCode: error.code,
      errorMessage: error.message,
    })),

  logoutUser: () => firebaseAuth.signOut().then(() => ({
    success: 1,
    message: 'logout',
  })),

  fetchUser: () => new Promise((resolve, reject) => {
    const unsub = firebaseAuth.onAuthStateChanged((user) => {
      unsub();
      resolve(user);
    }, (error) => {
      reject(error);
    });
  }),

  loginUser: user => firebaseAuth.signInWithEmailAndPassword(user.email, user.password)
    .then(userInfo => userInfo)
    .catch(error => ({
      errorCode: error.code,
      errorMessage: error.message,
    })),

  updateUserProfile: u => firebaseAuth.currentUser.updateProfile(u).then(() => firebaseAuth.currentUser, error => ({
    errorCode: error.code,
    errorMessage: error.message,
  })),

  resetPasswordEmail: email => firebaseAuth.sendPasswordResetEmail(email).then(() => ({
    message: 'Email sent',
  }), error => ({
    errorCode: error.code,
    errorMessage: error.message,
  })),

  changePassword: newPassword => firebaseAuth.currentUser.updatePassword(newPassword).then(user => user, error => ({
    errorCode: error.code,
    errorMessage: error.message,
  })),

  sendEmailVerification: () => firebaseAuth.currentUser.sendEmailVerification().then(() => ({
    message: 'Email sent',
  }), error => ({
    errorCode: error.code,
    errorMessage: error.message,
  })),

  getDatabaseReference: path => firebaseDb.ref(path),
};

export default FireBaseTools;
