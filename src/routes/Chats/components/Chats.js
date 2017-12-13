import React from 'react'
import PropTypes from 'prop-types'



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

        </div>
      )
  }

}

export default Chats
