export const PRODUCT_SET_LIST = 'PRODUCT_SET_LIST'
export const PRODUCT_SET_ITEM = 'PRODUCT_SET_ITEM'
import chan from "utils/chan"

// ------------------------------------
// Actions
// ------------------------------------
export const loadProductList =  ( options ) => {

  return (dispatch) => {

    chan.req("product-get", options ).then(products=>{
      dispatch({
        type    : PRODUCT_SET_LIST,
        payload : { listname: options.listname, products }
      })
      
    })

    
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
      lists.push({ id: listname, products })
      return {
        active: action.payload.listname,
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