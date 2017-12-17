import React from 'react';
import { connect } from 'react-redux';
import Dialog from 'components/Dialog'
import PropTypes from 'prop-types'
import store from 'store'

import { loadChats } from "store/local/dialog"
function mapStateToProps(state) {
  return {
    chatlist: state.dialog.chats
  };
}

const mapDispatchToProps = {
  loadChats
}

export class Chats extends React.Component {
  static propTypes = {
    //chatList: PropTypes.array,
    loadChats: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      dialog: 0
    }
  }

  setDialog(val){
    this.setState({dialog: val})
  }

  render() {

    let chats = this.props.chatlist.map((chat,index)=>{
      return (
          <div key={ index }>
            <div>{ chat.secondary_id }</div>
            <button onClick={this.setDialog.bind(this,chat.id)}>Открыть</button>
          </div>
        ) 
    })

    return (
      <div className="app_chats">
        <div className="app_flex_menu_style">
          <div className="chat_list">{chats}</div>
          <Dialog id={this.state.dialog} />
        </div>
      </div>
    )
  }

  componentWillMount(){
    this.props.loadChats({})
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chats)
