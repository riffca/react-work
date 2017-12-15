import React from 'react';
import { connect } from 'react-redux';
import { loadProductList } from 'src/store/local/product'

function mapStateToProps(state) {
  return {
  	products: state.product.list.find(item=>i.id == state.product.active)
  };
}

export class ProductList extends React.Component {
  static propTypes = {
    listname: React.PropTypes.string,
    user: React.PropTypes.number,
    shop: React.PropTypes.number,
    products: React.PropTypes.array
  };

  static defaultProps = {
    products: []
  }

  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.listname != this.nextProps.listname) {
      this._load()
    }
  }

  _load(){
    loadProductList( { listname: this.props.listname, user: this.props.user, shop: this.props.shop})
  }

  componentWillMount(){
    this._load()
  }
  render() {
    let products = this.props.products.map(product=>{
        return (
          <div className="app_product">
              {product.id}
          </div>
        )
    })
    return (
      <div className="app_product_list">
        {products}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  []
// Implement map dispatch to props
)(ProductList)

