import React from 'react';

class GraphApp extends React.Component {
	constructor(props) {
    	super(props);
    	this.state = { data: [], ticker: '' };
  	}

  	componentDidMount() {
        this.getTicker();
    }

    getTicker() {
    	console.log(fetch('/api/ticker', {
    		method: 'POST',
    		body: JSON.stringify({ticker: 'snp'})
    	}));
    }

    render() {
    	return (
    		<div className="App">
	    		<header className="App-header">
	    			<p>
	    				Edit <code>src/App.js</code> and save to reload.
	    			</p>
	    			<a
	    				className="App-link"
	    				href="https://reactjs.org"
	    				target="_blank"
	    				rel="noopener noreferrer"
	    			>
	    				Learn React
	    			</a>
				</header>
    		</div>
    		);
    	}
}

export default GraphApp
