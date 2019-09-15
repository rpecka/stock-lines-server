import React from 'react';
import {
	Charts,
	ChartContainer,
	ChartRow,
	YAxis,
	LineChart
} from "react-timeseries-charts";
import { TimeSeries } from "pondjs";

class GraphApp extends React.Component {
	constructor(props) {
		super(props);
		this.state = { timeseries: null };
	}

	componentDidMount() {
		this.getTicker();
	}

	getTicker() {
		console.log('Fetching snp ticker data');
		fetch('/api/ticker', {
			method: 'POST',
			body: JSON.stringify({ticker: 'snp'})
		}).then((response) => {
			response.json().then((json) => {
				console.log(json)
				var data = {
					name: json.ticker,
					columns: ["time", "price"],
					points: []
				};
				for (var i = 0; i < json.dates.length; i++) {
					data.points.push([json.dates[i], json.values[i]])
				}
				let max = Math.max.apply(null, json.values);
				let min = Math.min.apply(null, json.values);
				var timeseries = new TimeSeries(data);
				this.setState({timeseries: timeseries, min: min, max: max});
			});
		});
	}

	render() {
		return (
			<div>
				{ this.state.timeseries != null ?
					<Graph 
						timeseries={this.state.timeseries}
						min={this.state.min}
						max={this.state.max}
					/> : null }
			</div>
		);

	}
}

class Graph extends React.Component {
	render() {
		return (
			<ChartContainer
				timeRange={this.props.timeseries.timerange()}
				paddingRight={100}
				maxTime={this.props.timeseries.timerange().end()}
				minTime={this.props.timeseries.timerange().begin()}
				timeAxisAngledLabels={true}
				timeAxisHeight={65}
				onTrackerChanged={this.handleTrackerChanged}
				onBackgroundClick={() => this.setState({ selection: null })}
				enablePanZoom={true}
				onTimeRangeChanged={this.handleTimeRangeChange}
				// onMouseMove={(x, y) => this.handleMouseMove(x, y)}
				minDuration={1000 * 60 * 60 * 24 * 30}
			>
				<ChartRow height="400">
					<YAxis
						id="y"
						label="Price ($)"
						min={this.props.min}
						max={this.props.max}
						width="60"
						type="linear"
						format="$,.2f"
					/>
					<Charts>
						<LineChart
							axis="y"
							breakLine={false}
							series={this.props.timeseries}
							columns={["price"]}
							// style={style}
							interpolation="curveBasis"
							// highlight={this.state.highlight}
							onHighlightChange={highlight =>
								this.setState({ highlight })
							}
							// selection={this.state.selection}
							onSelectionChange={selection =>
								this.setState({ selection })
							}
						/>
					</Charts>
				</ChartRow>
			</ChartContainer>
		);
	}
}

export default GraphApp
