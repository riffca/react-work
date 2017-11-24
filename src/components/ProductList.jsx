import React from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
  	products: state.product.list
  };
}

export class ProductList extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div></div>
    );
  }
}

export default connect(
  mapStateToProps,
  []
// Implement map dispatch to props
)(ProductList)

