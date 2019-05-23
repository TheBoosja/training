import React from 'react';

import './text-input.scss';

export default props => {
	return (
		<input type='text' {...props} className='input' />
	);
};