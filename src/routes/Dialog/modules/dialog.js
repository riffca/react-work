
import chan from "utils/chan"

// ------------------------------------
// Constants
// ------------------------------------
export const DIALOG_OPEN = 'DIALOG_OPEN'
export const DIALOG_CLOSE = 'DIALOG_CLOSE'
export const DIALOG_ADD_MESSAGE = 'DIALOG_ADD_MESSAGE'
export const DILAOG_SET_CURRENT_MESSAGE_TEXT = 'DILAOG_SET_CURRENT_MESSAGE_TEXT'

// ------------------------------------
// Actions
// ------------------------------------
// export function openProfile (value = { name: "stas" }) {
//   return {
//     type    : PROFILE_SETUP_USER,
//     payload : value
//   }
// }

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export const setDialogs = dialogs => {

  return {
    type: DIALOGS_SETUP,
    dialogs
  }

}


export const loadDialogs = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      chan.req("user-dialogs").then(data=>{
        dispatch(setDialogs(data))
      })
    })
  }
}


export const actions = {
  loadDialogs

}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {

  [DIALOGS_SETUP] : (state, action) => { 
    return { dialogs: action.dialogs}
  },

}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  dialogs: []
}


export default function profileReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
