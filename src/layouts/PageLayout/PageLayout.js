import { IndexLink, Link } from 'react-router'
import PropTypes from 'prop-types'
import './PageLayout.scss'
import React from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    authUser: state.auth.user
  };
}

export class PageLayout extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    let { authUser={} } = this.props;

    return (
      <div className='container text-center'>

        <h2>Музыкальная школа</h2>

        <div className="app_user_info">
          <span className="app_link_button_spaces">{authUser.username}</span>
          <span className="app_link_button_spaces">{authUser.balance}</span>
        </div>

        <nav className="nav">
          <IndexLink to='/counter' className="nav-link active">Рассписание</IndexLink>
          <Link to='/' className="nav-link">Преподаватели</Link>
          <Link to='/profile' className="nav-link">Профиль</Link>
          <Link to='/chats' className="nav-link">Диалоги</Link>
          <Link to='/manage/products' className="nav-link">Товары</Link>
        </nav>

        <div className='page-layout__viewport'>
          {this.props.children}
        </div>

      </div>

    );
  }
}

export default connect(
  mapStateToProps,
// Implement map dispatch to props
)(PageLayout)

