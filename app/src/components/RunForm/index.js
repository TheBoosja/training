import React, { Component } from 'react';
import { connect } from 'react-redux';
import './run-form.scss';

// Actions
import { addRun, getRuns } from '../../actions/run';

import DatePicker from '../DatePicker';

class RunForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			date: '',
			distance: '',
			duration: ''
		};

		this.clearState = this.clearState.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onDateChange = this.onDateChange.bind(this);
		this.onChange = this.onChange.bind(this);
	}

	clearState() {
		this.setState({
			date: '',
			distance: '',
			duration: ''
		});
	}

	onSubmit(e) {
		e.preventDefault();
		const { date, distance, duration } = this.state;

		this.props.addRun(date, distance, duration)
			.then(() => {
				this.clearState();
				this.props.getRuns();
			});
	}

	onDateChange(newDate) {
		this.setState({
			date: newDate
		});
	}

	onChange(e) {
		const { name, value, validity } = e.target;

		this.setState({
			[name]: validity.valid ? value : this.state[name]
		});
	}

	render() {
		return (
			<form className='runForm' onSubmit={this.onSubmit}>
				<DatePicker
					wrapperClass='runForm__date-wrapper'
					className='runForm__date'
					selected={this.state.date}
					showTimeSelect
					timeFormat='HH:mm'
					timeIntervals={5}
					dateFormat='YYYY-MM-dd HH:mm'
					onChange={this.onDateChange}
					placeholderText='Date of run'
				/>
				<input
					className='runForm__input'
					name='distance'
					value={this.state.distance}
					onChange={this.onChange}
					placeholder='Distance'
					pattern='[0-9.]*'
				/>
				<input
					className='runForm__input'
					name='duration'
					value={this.state.duration}
					onChange={this.onChange}
					placeholder='Duration'
					pattern='[0-9.]*'
				/>
				<button
					className='runForm__btn'
					type='submit'
				>
					Add run
				</button>
			</form>
		);
	}
}

function mapStateToProps(state) {
	return {
		runResult: state.run.addRunResult
	};
}

export default connect(mapStateToProps, {
	addRun,
	getRuns
})(RunForm);
