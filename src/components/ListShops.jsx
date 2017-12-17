import React from 'react';
import { connect } from 'react-redux';
import { loadProductList } from 'store/local/product'
import PropTypes from 'prop-types'
import ShopCard from './ShopCard'

function mapStateToProps(state) {
  return {
  	productList: state.shop.lists.find(item=>{ 
      return item.id == state.shop.active
    }) || {shops: []}
  };
}

const mapDispatchToProps = {
  loadshopList
}

export class ListShops extends React.Component {
  static propTypes = {
    listname: PropTypes.string,
    user: PropTypes.number,
    shop: PropTypes.number,
    shopList: PropTypes.object,
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
    this.props.loadShopList( { 
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
    let list  = this.props.shopList
    let shops = []
    if (list && list.shops.length) {
      shops = list.shops.map((shop,index)=>{
          return <div key={index} onClick={()=>this.props.clickAction(shop.id)}>
            <ShopCard shop={product}/>
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
)(ListShops)

