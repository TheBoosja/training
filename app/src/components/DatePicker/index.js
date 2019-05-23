import React from 'react';
import DatePicker from 'react-datepicker';

const _DatePicker = ({ wrapperClass, ...rest }) => {
	return (
		<div className={wrapperClass}>
			<DatePicker {...rest} />
		</div>
	)
}

export default _DatePicker;
