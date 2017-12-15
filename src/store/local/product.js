export const PRODUCT_SET_LIST = 'PRODUCT_SET_LIST'


// ------------------------------------
// Actions
// ------------------------------------
export const loadProductList =  ( options ) => {

  return (dispatch) => {

    chan.req("product-get", options ).then(products=>{

      dispatch({
        type    : PRODUCT_SET_LIST,
        payload : { lisname: options.lisname, prosducts }
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
  lists: []
}


let  productReducer  = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_SET_LIST:
      let { listname, products } = action.payload
      let lists = state.lists.slice()
      lists.push({ id: listname, items })
      return {
        active: action.payload.listname,
        lists
      }
    default:
      return state
  }
}


export default productReducer