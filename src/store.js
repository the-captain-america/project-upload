
import { createStore, applyMiddleware, compose } from 'redux';
import reducers from './reducers';

const thunk = require('redux-thunk').default;

/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
  applyMiddleware(thunk),
));
/* eslint-enable */

export default store;
