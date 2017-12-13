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
        <div className="page_wrapper" >

        </div>
      )
  }

}

export default Profile
