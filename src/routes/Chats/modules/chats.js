import chan from "chan"

// ------------------------------------
// Constants
// ------------------------------------
export const CHATS_SET_ITEMS = 'CHATS_SET_ITEMS'
export const CHATS_ADD_ITEM = 'CHATS_SET_ITEMS'

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
let DEFINITION_CHAT_LIST = [

  {
    id: 1,
    members: [{username: "stas", role: 1}],
  },
  {
    id: 2,
    members: [{username: "riffca", role: 1}]


  }
]


export const loadChatList = () => {
  return (dispatch, getState) => {
    return  chan.req("user-dialogs").then(chats=>{
      if(!chats.error) {
        dispatch({
          type: CHATS_SET_ITEMS,
          chats: DEFINITION_CHAT_LIST
        })
      }
    })
  }
}

export const chatListUpdate = () => {
  return (dispatch, getState) => {
    return  chan.req("user-dialogs").then(chat=>{
      if(!chats.error) {
        dispatch({
          type: CHATS_ADD_ITEM,
          chat
        })
      }
    })
  }
}

export const actions = {
  loadChatList
}

// ------------------------------------
// Action Handlers
// ------------------------------------

const ACTION_HANDLERS = {

  [CHATS_SET_ITEMS] : (state, action) => { 
    return { list: action.chats }
  },
  [CHATS_ADD_ITEM] : (state, action) => {
    let list = state.list.slice()
    list.push(action,chat)
    return { list }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  list: []
}


export default function profileReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
