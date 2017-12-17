export const PRODUCT_SET_LIST = 'PRODUCT_SET_LIST'
export const PRODUCT_SET_ITEM = 'PRODUCT_SET_ITEM'
import chan from "utils/chan"

export const setList = (products, options) => {
  return {
    type    : PRODUCT_SET_LIST,
    payload : { listname: options.listname, products }
  }
}

// ------------------------------------
// Actions
// ------------------------------------

export const loadProductList =  ( options ) => {

  return (dispatch, getState) => {
    if(options.products) {
      dispatch(setList(options.products, options))
    } else {
      chan.req("product-get", options ).then(products=>{
        dispatch(setList(products, options))
      })
    }
  }
}


export const loadProduct = id => {

  return dispatch => {
    chan.req("product-get",{id}).then(product=>{
      dispatch({
        type: PRODUCT_SET_ITEM,
        payload: product
      })
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
	active: null,
  lists: [],
  opened: {}
}


let  productReducer  = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_SET_LIST:
      let { listname, products } = action.payload
      let lists = state.lists.slice()
      if(!(!!state.lists.find(i=>i.id==listname))) {
        lists.push({ id: listname, products })
      } 
      return {
        active: listname,
        lists
      }
    break;
    case PRODUCT_SET_ITEM:
      return { ...state, opened: action.payload }
    default:
      return state
  }
}


export default productReducer