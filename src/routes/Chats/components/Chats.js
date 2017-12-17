import React from 'react'
import PropTypes from 'prop-types'
import Chats from 'components/Chats'



class Chats extends React.Component {

  static propTypes = {
    chatList: PropTypes.array.isRequired,
    loadChatList: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.wikiProfile()
  }

  render(){
    return (
        <div className="page_wrapper" >
          <h1>Привет</h1>
          <Chats/>
        </div>
      )
  }

}

export default Chats
