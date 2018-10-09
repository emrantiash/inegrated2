import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import combineReducers from '../reducers';
import rootSaga from './sagas';


import thunk from 'redux-thunk';

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware,thunk];


if (process.env.NODE_ENV === 'development') {
  middleware.push(logger);
}

const store = createStore(combineReducers, applyMiddleware(...middleware));
// const store = createStore(
//   combineReducers,
//   {},
//   applyMiddleware(thunk)
// );

sagaMiddleware.run(rootSaga);

export default store;