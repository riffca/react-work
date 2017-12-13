import React from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {

  };
}

export class Typograpgy extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
  };

  constructor(props) {
    super(props);


    this.state = ({
		services
    })
  }

  render() {
    return (
      <div></div>
    );
  }
}

export default connect(
  mapStateToProps,
// Implement map dispatch to props
)(Typograpgy)
