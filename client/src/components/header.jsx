import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

class Header extends Component {

  renderLinks(){
    if(this.props.authenticated){
      return (
        <li className="nav-item">
          <Link to="/signout" className="nav-link">Sign Out</Link>
        </li>
      );
    } else {
      return [
        <li key={1} className="nav-item">
          <Link to="/signin" className="nav-link">Sign In</Link>
        </li>,
        <li key={2} className="nav-item">
          <Link to="/signup" className="nav-link">Sign Up</Link>
        </li>
      ];
    }
  }

  render(){
    return (
      <nav className="navbar navbar-light">
        <Link to="/" className="navbar-brand">Redux Auth</Link>
        <ul className="nav navbar-nav">
          {this.renderLinks()}

        </ul>
      </nav>
    );
  }
}

function mapStateToProps({ auth : { authenticated }}){
  return { authenticated };
}

export default connect(mapStateToProps)(Header)
