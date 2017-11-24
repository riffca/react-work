let defaultItems = [
  {
    title: "веник",
    price: 20
  },
  {
    title: "ручка",
    price: 30
  }
]
// ------------------------------------
// Constants
// ------------------------------------
export const PRODUCT_SET_LIST = 'PRODUCT_SET_LIST'
export const PRODUCT_LIST_ADD_ITEM = 'PRODUCT_LIST_ADD_ITEM'

// ------------------------------------
// Actions
// ------------------------------------
export const setList =  ({list_id="default", items=defaultItems }) => {
  return {
    type    : PRODUCT_SET_LIST,
    payload : { list_id, items }
  }
}

export const loadProductList = (username = "riffca") => {
	//console.log(account)
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch(setList({}))
      resolve()
    })
  }
}


export const addProductListItem = (username = "riffca") => {
  //console.log(account)
  return (dispatch, getState) => {
    return new Promise((resolve) => {
      dispatch(setList({}))
      resolve()
    })
  }
}

export const actions = {
	loadProductList
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
	list_id: null,
  lists: []
}


let  productReducer  = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_SET_LIST:
      let { list_id, items } = action.payload
      let lists = state.lists.slice()
      lists.push({ id: list_id, items })
      return {
        list_id: action.payload.list_id,
        lists
      }

    default:
      return state
  }
}


export default productReducer