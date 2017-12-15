import React from 'react';
import { connect } from 'react-redux';
import Dilaog from 'src/components/Dialog'

import { loadChats } from "store/local/dialog"
function mapStateToProps(state) {
  return {
    chatlist: state.dialog.chats
  };
}

export class Chats extends React.Component {
  static propTypes = {
    name: React.PropTypes.string,
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
      <div>
        <div>chat.secondary_id</div>
        <button onClick={this.setDialog(index)}>Открыть</button>
      </div>
    })

    return (
      <div className="app_chats">
        <div className="chat_list">{chats}</div>
        <Dialog id={this.state.dialog} />
      </div>
    )
  }

  componentDidMount(){
    loadChats({})
  }
}

export default connect(
  mapStateToProps,
// Implement map dispatch to props
)(Chats)
