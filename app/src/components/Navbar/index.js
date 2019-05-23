import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './navbar.scss';

// Actions
import { deauthenticate } from '../../actions/auth';

class Navbar extends Component {
	renderNavLink(to, label, exact = false) {
		return (
			<NavLink
				to={to}
				exact={exact}
				className='nav__link'
				activeClassName='nav__active'
			>
				{label}
			</NavLink>
		);
	}

	renderAuthSection() {
		if (this.props.isAuthenticated) {
			return (
				<div>
					<span className='nav__user'>{this.props.currentUser.email}</span>
					<div className='nav__link' onClick={this.props.deauthenticate}>Log out</div>
				</div>
			);
		}

		return (
			<div>
				{this.renderNavLink('/login', 'Login')}
				{this.renderNavLink('/signup', 'Sign up')}
			</div>
		);
	}

	render() {
		return (
			<nav className='nav'>
				<div className='nav__main'>
					{this.renderNavLink('/', 'Home', true)}
					{this.renderNavLink('/training', 'Training')}
				</div>
				{this.renderAuthSection()}
			</nav>
		);
	}
}

function mapStateToProps(state) {
	return {
		isAuthenticated: state.auth.isAuthenticated,
		currentUser: state.auth.user
	};
}

export default connect(mapStateToProps, {
	deauthenticate
})(Navbar);
