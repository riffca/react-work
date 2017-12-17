import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

function mapStateToProps(state) {
  return {

  };
}

export class DialogMessage extends React.Component {
  static propTypes = {
    message: PropTypes.object,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="app_message">
      	<span className="_message_text"></span>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
// Implement map dispatch to props
)(DialogMessage)
