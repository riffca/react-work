import React from 'react';
import { connect } from 'react-redux';
import { loadProductList } from 'store/local/product'
import PropTypes from 'prop-types'

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
      this._load()
    }
  }

  _load(){
    this.props.loadProductList( { 
      auth: this.props.auth,
      listname: this.props.listname || "auth", 
      user: this.props.user, 
      shop: this.props.shop
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
          return (
            <div onClick={()=>this.props.clickAction(product.id)} key={index} className="app_product">
                <div className="_product_image">
                </div>
                <div className="_product_title">
                  <h3>{product.title}</h3>
                </div>
            </div>
          )
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

