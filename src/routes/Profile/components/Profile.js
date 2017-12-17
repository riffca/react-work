import React from 'react'
import PropTypes from 'prop-types'
import FormUniversal from 'components/FormUniversal'



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
          <div>          
            <div className="app_standart_button">Новый магазин</div>
            <div className="app_standart_button">Cоздать товар</div>
          </div>
          <h1> { this.props.profileInfo.name } </h1>
        </div>
      )
  }

}

export default Profile
