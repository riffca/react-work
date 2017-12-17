import React from 'react';
import { connect } from 'react-redux';
import { loadListOfUsers } from 'local/users-list'

import chan from "utils/chan"
function mapStateToProps(state) {
  return {
  	users: state.listOfUsers
  };
}



export class UserList extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  	this.props.loadListOfUsers()
  }
  render() {
    return (
      <div id="list_of_users page_wrapper"> 
      {
      	this.props.users.map((item,index)=>{
      	 	return <div key={index}>{item.username}</div>
      	})
      }
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  { loadListOfUsers }
)(UserList)
