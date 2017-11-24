import { combineReducers } from 'redux'
import locationReducer from './location'
import authReducer from './local/auth'
import productReducer from './local/product'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
  	auth: authReducer,
    location: locationReducer,
    product: productReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
