import React from 'react';

import './radiobutton.scss';

export default props => {
	const { id, value, selected, onChange, children, ...rest } = props;

	const submit = (e) => onChange(e.target.value);

	return (
		<div className='radio'>
			<input
				id={id}
				value={value}
				checked={selected === value}
				onChange={submit}
				type='radio'
				className='radio__input'
				{...rest}
			/>
			<label
				htmlFor={id}
				className='radio__label'
			>
				{children}
			</label>
		</div>
	);
};