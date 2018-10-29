import { applyMiddleware, createStore, compose } from 'redux';
import reduxThunk from 'redux-thunk';

import rootReducer from './reducers';

let preloadedState = {};

if (typeof window !== 'undefined') {
  preloadedState = window.INITIAL_STATE || {};
  delete window.INITIAL_STATE;
}

export default createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(reduxThunk),
);
