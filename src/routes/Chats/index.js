import { injectReducer } from 'store/reducers'

export default (store) => ({
  path : 'chats',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Dialogs = require('./containers/ChatsContainer').default
      const reducer = require('./modules/chats').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'chats', reducer })

      /*  Return getComponent   */
      cb(null, Dialogs)

    /* Webpack named bundle   */
    }, 'chats')
  }
})
