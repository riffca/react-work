import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import ShopCard from 'components/ShopCard'
import { loadShopList } from 'store/local/shop'

function mapStateToProps(state) {
  return {
  	shopList: state.shop.lists.find(item=>{ 
      return item.id == state.shop.active
    }) || {shops: []}
  };
}

const mapDispatchToProps = {
  loadShopList
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
      user: this.props.user
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
            <ShopCard shop={shop}/>
          </div>
      }) 
    }

    return (
      <div className="app_shop_list">
        {shops.length ? shops : null}
      </div>
    );

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListShops)

