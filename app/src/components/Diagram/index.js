import React, { Component } from 'react';
import {
	XYPlot,
	XAxis,
	YAxis,
	VerticalGridLines,
	HorizontalGridLines,
	LineMarkSeries
} from 'react-vis';
import './diagram.scss';

class Diagram extends Component {
	constructor(props) {
		super(props);

		this.scale = .6;
		this.state = {
			width: window.innerWidth * this.scale
		};

		this.updateWidth = this.updateWidth.bind(this);
	}

	componentDidMount() {
		window.addEventListener('resize', this.updateWidth);
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.updateWidth);
	}

	updateWidth() {
		this.setState({
			width: window.innerWidth * this.scale
		});
	}

	render() {
		return (
			<div className='diagram'>
				<XYPlot
					margin={60}
					height={300}
					width={this.state.width}
					xType='time'
				>
					<HorizontalGridLines />
					<VerticalGridLines />
					<XAxis tickLabelAngle={-90} width={100} />
					<YAxis />
					{this.props.datas.map((d, key) => <LineMarkSeries data={d} key={key} />)}
				</XYPlot>
			</div>
		);
	}
};

export default Diagram;