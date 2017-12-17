import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { loadDialog, sendMessage } from 'store/local/dialog'

import DialogMessage from 'components/DialogMessage'

import chan from "utils/chan"

import store from "store"


function mapStateToProps(state) {
  let  { dialog: { chats, current } } = state
  return {
  	dialog: chats.find(item=>item.id==current) || {messages:[]},
  };
}

const mapDispatchToProps = {
  loadDialog,
  sendMessage
}

export class Dialog extends React.Component {
  static propTypes = {
    id: PropTypes.number,
    dialog: PropTypes.object,
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
    let message = {
      text: this.state.value,
      mime: "text/plain",
    }
  	this.props.sendMessage(message)
  }
  render() {
    let { dialog } = this.props 
  	let messages = dialog.messages ? dialog.messages.map(message=>{
  		return <DialogMessage message={message}/>
  	}) : []

    return this.props.dialog.secondary_id ? (
      <div className="app_dialog">
        <div className="dialog_title">{ dialog.secondary_id }</div>
        <div>
        	<div className="_messages">{messages}</div>
        	<div className="_send_bar">
        		<input value={this.state.value} onChange={this.change.bind(this, event)}/>
        		<button onClick={this.request.bind(this)}>Send</button>
        	</div>
        </div>
      </div>
    ) : <div><h1>Беседа не выбрана</h1></div>
  }

  componentWillReceiveProps(nextProps){
  	if(this.props.id !== nextProps.id) {
  		this.setState({current: nextProps.id})
  		this.props.loadDialog(nextProps.id)
  	}

  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dialog)
