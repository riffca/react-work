

export const LIST_USER_SET = "LIST_USER_SET"


let DEFENITION_LIST_OF_USERS = [
	{ username: "stas", type: "teacher", skill:"guitar"},
	{ username: "vova", type: "teacher", skill:"viola"},
	{ username: "sveta", type: "teacher", skill:"vox"},
]

export const loadListOfUsers = (list=DEFENITION_LIST_OF_USERS) => {
	return (dispatch, getState) => {
		dispatch({
			type: LIST_USER_SET,
			list	
		})
	}
}

export const actions = {
	loadListOfUsers
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = []


let  listOfUsersReducer  = (state = initialState, action) => {
  switch (action.type) {
    case LIST_USER_SET:
      return action.list
    default:
      return state
  }
}


export default listOfUsersReducer



