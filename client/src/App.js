import React from 'react';
import Intro from './components/intro';
import Form from "./containers/Series";
import GraphApp from "./GraphApp"
import { Timeline } from 'react-twitter-widgets'
import './App.css';
import 'whatwg-fetch'


class App extends React.Component {
  render() {
      console.log("Rengering app");
    return (
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">Tweet Like Trump </h1>
              <Intro message="tweet as if you were trump and see the stock reaction"/>
          </header>
          <div className="content">
              <div>
                  <Form />
                  <Timeline
                      dataSource={{
                          sourceType: 'profile',
                          screenName: 'realdonaldtrump'
                      }}
                      options={{
                          username: 'realDonaldTrump',
                          height: 400
                      }}
                      onLoad={() => console.log('Timeline is loaded!')}
                  />
              </div>
              <div style={{display: 'flex', justifyContent: 'center'}}>
                  <GraphApp />
              </div>
          </div>

        </div>
    );
  }
}

export default App;
