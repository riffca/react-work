import React from 'react';
import PropTypes from 'prop-types';

export default class ImageCustom extends React.Component {
  static propTypes = {
    googleID: PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
  	let { googleID } = this.props
  	if (!googleID) return <h5>No image</h5>
    return (
      <img src={`https://drive.google.com/uc?export=view&id=${googleID}`} />
    );
  }
}
