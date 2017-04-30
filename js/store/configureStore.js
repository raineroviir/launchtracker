import thunk from 'redux-thunk'
import { applyMiddleware, createStore } from 'redux'
import reducers from '../reducers'
import createLogger from 'redux-logger'

import promise from './promise'

const logger = createLogger({
  predicate: (getState, action) => process.env.NODE_ENV !== `production`
});

const createStoreWithMiddleware = applyMiddleware(thunk, promise, logger)(createStore)

function configureStore(preloadedState) {
  const store = createStoreWithMiddleware(reducers, preloadedState)

  return store
}

export default configureStore
