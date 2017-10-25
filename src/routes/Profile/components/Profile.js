import React from 'react'
import PropTypes from 'prop-types'



class Profile extends React.Component {

  static propTypes = {
    profileInfo: PropTypes.object.isRequired,
    openProfile: PropTypes.func.isRequired,
    wikiProfile: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.wikiProfile()
  }

  render(){
    return (
        <div style={{ margin: '0 auto' }} >
          <span onClick={this.props.openProfile}>Показать профиль</span>
          <h1> { this.props.profileInfo.name } </h1>
        </div>
      )
  }

}

export default Profile
