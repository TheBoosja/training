import React from 'react';
import './box-container.scss';

export default (props) => {
	return (
		<div className={`boxContainer ${props.className || ''}`}>
			{props.children}
		</div>
	);
}