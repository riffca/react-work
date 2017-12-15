import React from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {

  };
}

export class DialogMessage extends React.Component {
  static propTypes = {
    message: React.PropTypes.object,
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
