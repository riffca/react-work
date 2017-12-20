export const SHOP_SET_LIST = 'SHOP_SET_LIST'
export const SHOP_SET_ITEM = 'SHOP_SET_ITEM'
import chan from "utils/chan"

export const setList = (shops, options) => {
  return {
    type    : SHOP_SET_LIST,
    payload : { listname: options.listname, shops }
  }
}

// ------------------------------------
// Actions
// ------------------------------------

export const loadShopList =  ( options ) => {

  return (dispatch, getState) => {
    if(options.shops) {
      dispatch(setList(options.shops, options))
    } else {
      chan.req("shop-get", options ).then(shops=>{
        dispatch(setList(shops, options))
      })
    }
  }
}


export const loadShop = id => {

  return dispatch => {
    chan.req("shop-get",{id}).then(product=>{
      dispatch({
        type: SHOP_SET_ITEM,
        payload: product
      })
    })
  }

}


export const actions = {
	loadShopList
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
	active: null,
  lists: [],
  opened: {}
}


let shopReducer  = (state = initialState, action) => {
  switch (action.type) {
    case SHOP_SET_LIST:
      let { listname, shops } = action.payload
      let lists = state.lists.slice()
      if(!(!!state.lists.find(i=>i.id==listname))) {
        lists.push({ id: listname, shops })
      } 
      return {
        active: listname,
        lists
      }
    break;
    case SHOP_SET_ITEM:
      return { ...state, opened: action.payload }
    default:
      return state
  }
}


export default shopReducer