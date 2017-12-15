// ------------------------------------
// Constants
// ------------------------------------
export const SET_CHATS = 'SET_CHATS'
export const SET_DIALOG = 'SET_DIALOG'
export const DIALOG_ADD_MESSAGE = 'DIALOG_ADD_MESSAGE'

// ------------------------------------
// Actions
// ------------------------------------

export const loadChats = ({})=>{
  chan.req("dialog-fetch").then(dialogs=>{
    return (dispatch) => {
      dispatch({
        type    : SET_CHATS,
        payload : dialogs
      })
    }
  })
}


export const loadDialog = (id)=>{
  chan.req("dialog-fetch",{id}).then(dialog=>{
    return (dispatch) => {
      dispatch({
        type    : SET_DIALOG,
        payload : dialog
      })
    }
  })
}


export const actions = {
	loadChats,
  loadDialog,
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
	chats: [],
  current: 0
}


let  authReducer  = (state = initialState, action) => {
  switch (action.type) {
    case SET_CHATS:
      state.chats =  [...state.chats, ...action.payload]
      return state
    case SET_DIALOG:
      state.current = 0
      return state
    case DIALOG_ADD_MESSAGE: 
      let dialog = state.find(i=>i.id==state.current.id)
      if(dialog) {
        dialog.messages.push(action.payload)
        state.dialog = dialog
        return state
      } else {
        console.warn("no such dialog")
        return state 
      }
    default:
      return state
  }
}


export default authReducer