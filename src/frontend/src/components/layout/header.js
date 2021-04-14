import React, {Component} from 'react';
import {Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from './../../actions/auth';


class Header extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  };

  render(){
    const { isAuthenticated, user } = this.props.auth;
    const guestLink = (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        <li className={'nav-item'}>
          <Link className={'nav-link'} to={'/register'}>Register</Link>
        </li>
        <li className={'nav-item'}>
          <Link className={'nav-link'} to={'/login'}>Login</Link>
        </li>
      </ul>
    );
    const authLink = (
      <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        <span className={'navbar-text mr-3'} >
          <strong >{ user ? `Welcome ${user.username}`: '' }</strong>
        </span>
        <li className={'nav-item'}>
          <button
            className={'nav-link btn btn-info btn-sm text-light'}
            onClick={this.props.logout}
            >Logout</button>
        </li>
      </ul>
    );
    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button"
                  data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01"
                  aria-controls="navbarTogglerDemo01" aria-expanded="false"
                  aria-label="Toggle navigation"
                  >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <a className="navbar-brand" href="#">Lead Manager</a>
              { isAuthenticated ? authLink : guestLink}
          </div>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(mapStateToProps, {logout})(Header);
