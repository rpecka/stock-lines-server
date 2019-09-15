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
		super(props)
		this.state = props;
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.data !== nextProps.data && nextProps.data != null) {
			var result = this.makeSeriesFromData(nextProps.data);
			this.setState({timeseries: result[0], min: result[1], max: result[2]});
		}
	}

	makeSeriesFromData(ticker_data) {
		var data = {
			name: ticker_data.ticker,
			columns: ["time", "price"],
			points: []
		};
		for (var i = 0; i < ticker_data.dates.length; i++) {
			data.points.push([ticker_data.dates[i], ticker_data.values[i]])
		}
		let max = Math.max.apply(null, ticker_data.values);
		let min = Math.min.apply(null, ticker_data.values);
		return [new TimeSeries(data), min, max];
	}

	getTicker() {
		console.log('Fetching snp ticker data');
		fetch('/api/ticker', {
			method: 'POST',
			headers: {
				"Content-Type": 'application/json'
			},
			body: JSON.stringify({ticker: 'snp'})
		}).then((response) => {
			response.json().then((json) => {
				console.log(json)
				var result = this.makeSeriesFromData(json);
				this.setState({timeseries: result[0], min: result[1], max: result[2]});
			});
		});
	}

	render() {
		console.log("Rendering graph")
		var dataAvailable = this.state.timeseries != null;
		if (!dataAvailable) {
			this.getTicker();
		}
		return (
			<div>
				{ dataAvailable ?
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
				title={this.props.timeseries.name()}
				titleStyle={{fill: "#000000", fontWeight: 20000}}
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
						format="$,"
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
