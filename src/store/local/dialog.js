import chan from "utils/chan"

// ------------------------------------
// Constants
// ------------------------------------
export const SET_CHATS = 'SET_CHATS'
export const SET_DIALOG = 'SET_DIALOG'
export const DIALOG_ADD_MESSAGE = 'DIALOG_ADD_MESSAGE'


export const loadChats = (options)=>{
	return (dispatch, getState) => {
		chan.req("dialog-fetch",options)
			.then(chats=>{
				let { dialog: { chats: chatList }} = getState()
				if (chatList.length) {
					if(chatList[0].id != chats[0].id) {
						dispatch({
							 type: SET_CHATS,
							 payload: chats
						})
					}	
				} else {
					dispatch({
						type: SET_CHATS,
						payload: chats
					})
				}
			})
	}
}


export const loadDialog = (dialog)=>{
		return (dispatch) => {
			chan.req("dialog-fetch",{dialog}).then(dialog=>{
					dispatch({
						type    : SET_DIALOG,
						payload : dialog.id
					})
			})
		}
}

export const sendMessage = ({dialog, message}) =>{
		return dispatch => {
			chan.req("dialog-message",{dialog, message}).then(data=>{
					dispatch({
						type: DIALOG_ADD_MESSAGE,
						payload: data
					})
			})
		}
}


export const actions = {
	loadChats,
	loadDialog,
	sendMessage
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
			return { ...state, chats:  [...state.chats, ...action.payload] }
		case SET_DIALOG:
			return { ...state, current: action.payload }
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