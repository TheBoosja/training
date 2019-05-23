import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import parse from 'date-fns/parse';
import './training.scss';

// Actions
import { getRuns } from '../../actions/run';

// Components
import Diagram from '../../components/Diagram';
import RunForm from '../../components/RunForm';

const Training = (props) => {
	const [ durationData, setDurationData ] = useState([]);
	const [ distanceData, setDistanceData ] = useState([]);
	const [ velocityData, setVelocityData ] = useState([]);

	useEffect(() => {
		props.getRuns();
	}, 0);

	useEffect(() => {
		const chartData = props.runData.reduce((sets, item) => {
			const date = parse(item.date);
			const velocity = item.distance / (item.duration / 60);

			const durSet = { x: date, y: item.duration };
			const disSet = { x: date, y: item.distance };
			const velSet = { x: date, y: velocity };

			const durSets = [ ...sets.durSets, durSet ];
			const disSets = [ ...sets.disSets, disSet ];
			const velSets = [ ...sets.velSets, velSet ];
			return { durSets, disSets, velSets };
		}, { durSets: [], disSets: [], velSets: []});

		setDurationData(chartData.durSets);
		setDistanceData(chartData.disSets);
		setVelocityData(chartData.velSets);
	}, [props.runData]);

	// console.log('data', durationData, distanceData, velocityData);
	return (
		<div className='training'>
			<RunForm />
			<Diagram datas={[ durationData ]} />
			<Diagram datas={[ distanceData, velocityData ]} />
		</div>
	);
}

function mapStateToProps(state) {
	return {
		runData: state.run.runs
	};
}

export default connect(mapStateToProps, {
	getRuns
})(Training);
