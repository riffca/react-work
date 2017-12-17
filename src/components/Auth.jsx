import React from 'react';
import { connect } from 'react-redux';
import FormUniversal from './FormUniversal'
import PropTypes from 'prop-types'

function mapStateToProps(state) {
}

export class Signup extends React.Component {
  static propTypes = {
    name: PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  render() {
  	return this.props.location.pathname == '/login' ? 
  		(
  			<div>
  				<h1 className="text-center">Вход</h1>
	      		<FormUniversal method={"auth-login"}/>
  			</div>
  		)
  		 :
  		(
  			<div>
			     <h1 className="text-center">Регистрация</h1>
			     <FormUniversal method={"auth-signup"}/>
  			</div>
  		)
  }
}

export default connect(
  mapStateToProps,
// Implement map dispatch to props
)(Signup)
