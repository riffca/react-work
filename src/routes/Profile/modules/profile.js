// ------------------------------------
// Constants
// ------------------------------------
export const PROFILE_SETUP_USER = 'PROFILE_SETUP_USER'
export const PROFILE_WIKI = 'PROFILE_WIKI'


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

export const openProfile = () => {
  return (dispatch, getState) => {
    let userInfo = {
      name: "Unregistered",
    }
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch({
          type    : PROFILE_SETUP_USER,
          payload : userInfo
        })
        resolve()
      }, 200)
    })
  }
}

export const wikiProfile = () => {
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch({
          type    : PROFILE_WIKI,
          payload : true
        })
        resolve()
      }, 200)
    })
  }
}

export const actions = {
  openProfile,
  wikiProfile
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {
  [PROFILE_SETUP_USER]    : (state, action) => { 
    console.log(state)
    return Object.assign({}, state , action.payload)
  },

  [PROFILE_WIKI]    : (state, action) => { 
    return Object.assign({}, state , { wiki: action.payload })
  },

}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {mama: true}


export default function profileReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
