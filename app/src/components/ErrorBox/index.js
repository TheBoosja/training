import React from 'react';
import './error-box.scss';

export default (props) => {
	return (
		<div className='error'>
			<span className='error__label'>
				{props.text}
			</span>
			<span
				className='error__close'
				onClick={props.onClose}
			>
				&times;
				</span>
		</div>
	);
};
