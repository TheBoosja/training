import React from 'react';

import './checkbox.scss';

export default props => {
	const { id, children, ...rest } = props;

	return (
		<div className='checkbox'>
			<input
				id={id}
				type='checkbox'
				className='checkbox__input'
				{...rest}
			/>
			<label
				htmlFor={id}
				className='checkbox__label'
			>
				{children}
			</label>
		</div>
	);
};