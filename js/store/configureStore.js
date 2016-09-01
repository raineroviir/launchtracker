import thunk from 'redux-thunk'
import { applyMiddleware, createStore } from 'redux'
import reducers from '../reducers'
import createLogger from 'redux-logger'

import promise from './promise'

const logger = createLogger({
  predicate: (getState, action) => process.env.NODE_ENV !== `production`
});

const createStoreWithMiddleware = applyMiddleware(thunk, promise, logger)(createStore)

function configureStore() {
  const store = createStoreWithMiddleware(reducers)

  return store
}

export default configureStore
