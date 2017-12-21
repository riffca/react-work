import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ImageCustom from 'components/ImageCustom'

function mapStateToProps(state) {
  return {

  };
}

export class Product extends React.Component {
  static propTypes = {
    product: PropTypes.object,
    miniView: PropTypes.bool,
  };

  static defaultProps = {
  	product: {
  		id: 0,
  		title: "new",
  		description: "Привет",
  		images: []
  	},
  	miniView: false
  }

  constructor(props) {
    super(props);
  }

  render() {

  	let {product}  = this.props

    let pictureID = product.images.length ? product.images[0].intgoogle : ""

  	if ( this.props.miniView) {
	    return (
            <div className="app_product">
                <div className="_product_image">
                  <ImageCustom googleID={pictureID} />
                </div>
                <div className="_product_title">
                  <h3>{product.title}</h3>
                </div>
            </div>
	    );
  	} else {
	    return (
	      <div>
	      	

	      </div>
	    );
  	}
  }
}

export default connect(
  mapStateToProps,
// Implement map dispatch to props
)(Product)
