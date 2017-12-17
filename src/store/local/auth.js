import chan from "utils/chan"

// ------------------------------------
// Constants
// ------------------------------------
export const AUTH_PROCESS = 'AUTH_PROCESS'

// ------------------------------------
// Actions
// ------------------------------------
export const setAccount =  (account = {username: "stas"}) => {
  return {
    type    : AUTH_PROCESS,
    payload : account
  }
}



export const receiveAccount = (username = "riffca") => {
	//console.log(account)
  return (dispatch, getState) => {
    let account = {
  		username,
  		balance: 100
	  }
    return new Promise((resolve) => {
    	if(!getState.isAuth) {
	        dispatch(setAccount(account))
    	}
        resolve()
    })
  }
}

export const actions = {
	receiveAccount
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
	isAuth: false
}


let  authReducer  = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_PROCESS:
      return { ...state, user:action.payload }
    default:
      return state
  }
}


export default authReducer