import React from 'react';
import { connect } from 'react-redux';
import { loadProductList } from 'store/local/product'
import PropTypes from 'prop-types'
import Product from './Product'

function mapStateToProps(state) {
  return {
  	productList: state.product.lists.find(item=>{ 
      return item.id == state.product.active
    }) || {products: []}
  };
}

const mapDispatchToProps = {
  loadProductList
}

export class ListProducts extends React.Component {
  static propTypes = {
    listname: PropTypes.string,
    user: PropTypes.number,
    shop: PropTypes.number,
    productList: PropTypes.object,
    clickAction: PropTypes.func,
  };

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {

    if(this.props.listname != nextProps.listname) {
      this._load(nextProps.listname)
    }
  }

  _load(nextListname){
    this.props.loadProductList( { 
      auth: this.props.listname == "auth",
      listname: nextListname || this.props.listname, 
      user: this.props.user, 
      shop: this.props.shop,
      loadedProducts: this.props.loadedProducts
    })
  }

  componentWillMount(){
    this._load()
  }
  render() {
    let list  = this.props.productList
    let products = []
    if (list && list.products.length) {
      products = list.products.map((product,index)=>{
          return <div key={index} onClick={()=>this.props.clickAction(product.id)}>
            <Product miniView={true} product={product} key={index} />
          </div>
      }) 
    }

    return (
      <div className="app_product_list">
        {products.length ? products : null}
      </div>
    );

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
// Implement map dispatch to props
)(ListProducts)

