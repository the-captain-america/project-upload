import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Menu extends Component {
  renderOverlay() {
    return (
      <div 
        onClick={this.props.onPressOverlay} 
        style={{ height: `${this.props.height}` }}
        className={this.props.isActive ? 'overlay' : 'hide'}
      />
    );
  }

 renderMenu() {
    return (
      <div>
        <a
          onClick={this.props.onPressMenu}
          className={this.props.isActive ? 'menu-btn --active' : 'menu-btn'}>
          <span />
        </a>
      </div>
    );
  }

  renderNav() {
    return (
      <div
        style={{ height: `${this.props.height}` }}
        className={this.props.isActive ? 'menu --active' : 'menu'}
      >
        {this.renderMenu()}
        <div className="menu__logo">
          <Link to="/">
            <img src="../../../../public/img/logo.png" alt="logo" />
          </Link>
        </div>
        <ul className="menu__list">
          <li>
            <Link to="/">
              <i className="fa fa-home" aria-hidden="true" />
              Home
            </Link>
          </li>
          <li>
            <Link to="/about">
              <i className="fa fa-info-circle" aria-hidden="true" />
              About
            </Link>
          </li>
        </ul>
        <div className="triangle" />
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderNav()}
        {this.renderOverlay()}
      </div>
    );
  }
}

Menu.propTypes = {
  height: PropTypes.string.isRequired,
};

export default Menu;
