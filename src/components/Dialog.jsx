import React from 'react';
import { connect } from 'react-redux';

import { loadDialog, sendMessage } from 'src/store/local/dialog'

import DialogMessage from 'src/components/DialogMessage'
import chan from "chan"


function mapStateToProps(state) {
  return {
  	dialog: state.dialog.current,
  };
}

export class Dialog extends React.Component {
  static propTypes = {
    id: React.PropTypes.number,
  };

  constructor(props) {
    super(props);
    this.state = {
    	value: ""
    }
  }

  change(e) {
  	e.preventDefault()
  	let value = e.target.value
  	this.setState({value})
  }

  request(){

  	sendMessage(this.state.value)

  }

  render() {

  	let messages = this.props.dialog.messages.map(message=>{
  		return <DialogMessage message={message}/>
  	})

    return (
      <div className="app_dialog">
      	<div className="_messages">{messages}</div>
      	<div className="_send_bar">
      		<input value={this.state.value} onChange={this.change.bind(this, event)}/>
      		<button onClick={this.request.bind(this)}>Send</button>
      	</div>
      </div>
    );
  }

  componentWillReceiveProps(nextProps){

  	if(this.props.id !== nextProps.id) {
  		this.setState({current: nextProps.id})
  		loadDialog(nextProps.id)
  	}

  }

  componentWillMount(){
  	this.setState({current: this.props.id})
  	loadDialog(this.props.id)
  }

}

export default connect(
  mapStateToProps,
// Implement map dispatch to props
)(Dialog)
