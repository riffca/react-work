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
          <span onClick={this.props.openProfile}>Показать профиль</span>
          <h1> { this.props.profileInfo.name } </h1>
          <h1 className="text-center">Создать магазин</h1>
          <FormUniversal method={"shop-change"}/>
          <h1 className="text-center">Регистрация</h1>
          <FormUniversal method={"auth-signup"}/>
          <h1 className="text-center">Вход</h1>
          <FormUniversal method={"auth-login"}/>
        </div>
      )
  }

}

export default Profile
