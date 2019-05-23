import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './login.scss';

// Components
import BoxContainer from '../../components/BoxContainer';
import ErrorBox from '../../components/ErrorBox';

// Actions
import { authenticate } from '../../actions/auth';

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			showError: false,
			showFocusedInput: {
				email: false,
				password: false
			}
		};
	}

	componentDidMount() {
		if (this.props.authFailed) {
			this.setShowError(true);
		}
	}

	componentWillUpdate(next) {
		if (next.authFailed !== this.props.authFailed) {
			this.setShowError(next.authFailed);
		}
	}

	setShowError(show = false) {
		this.setState({
			showError: show
		});
	}

	onSubmit = (e) => {
		e.preventDefault();
		const { email, password } = this.state;

		this.props.authenticate(email, password);
	}

	onChange = (e) => {
		const { name, value } = e.target;

		this.setState({
			[name]: value
		});
	}

	renderAuthError() {
		return (
			<ErrorBox
				text={'Invalid email or password! Please try again.'}
				onClose={() => this.setShowError(false)}
			/>
		);
	}

	renderInput = (name, value, label, type = 'text') => {
		const onClick = () => {
			this.setState({
				showFocusedInput: {
					...this.state.showFocusedInput,
					[name]: true
				}
			});
		};
		console.log('showFocus', this.state.showFocusedInput);
		return (
			<div className='login__control'>
				{/* <label htmlFor={name} className='login__label'>{label}</label> */}
				<div className='login__pseudo' onClick={onClick}>{label}</div>
				{this.state.showFocusedInput[name] && this.renderFocusedInput(name, value, label, type)}
			</div>
		);
	}

	renderFocusedInput(name, value, label, type = 'text') {
		const onClick = () => {
			this.setState({
				showFocusedInput: {
					...this.state.showFocusedInput,
					[name]: false
				}
			});
		}

		return (
			<div className='login__input-wrapper' onClick={onClick}>
				<input
					id={name}
					name={name}
					value={value}
					type={type}
					placeholder={label}
					onChange={this.onChange}
					className='login__input'
					autoFocus
				/>
			</div>
		);
	}

	render() {
		if (this.props.isAuthenticated) {
			return <Redirect to='/' />;
		}

		return (
			<BoxContainer>
				<div className='login'>
					<form onSubmit={this.onSubmit} className='login__form'>
						{this.renderInput('email', this.state.email, 'Email')}
						{this.renderInput('password', this.state.password, 'Password', 'password')}
						{this.state.showError && this.renderAuthError()}
						<button className='login__button' type='submit'>Login</button>
					</form>
				</div>
			</BoxContainer>
		);
	}
}

function mapStateToProps(state) {
	return {
		isAuthenticated: state.auth.isAuthenticated,
		authFailed: state.auth.authFailed
	};
}

export default connect(mapStateToProps, {
	authenticate
})(Login);
