import React from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {

  };
}

export class ShopCard extends React.Component {
  static propTypes = {
    shop: React.PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  render() {
  	let { shop } = this.props
    return (
      <div className="app_shop_card">
      	<h3>{shop.name}</h3>
        <div>{shop.advt}</div>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
// Implement map dispatch to props
)(ShopCard)
