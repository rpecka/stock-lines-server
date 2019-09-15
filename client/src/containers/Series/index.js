import React, {Component} from "react";
import './index1.css';
import TweetTable from '../../components/TweetTable';
import trump from "./Unknown.jpg";

class Form extends Component {
  constructor(props) {
      super(props);
      this.state = {tweetArray: []};

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
      this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    let tweetCards = this.state.tweetArray;
    tweetCards.unshift(this.state.value);
    this.setState({tweetArray: tweetCards, value: ''})
  }

    render() {
        return (
            <div className="newTweet">
                <div className="handle">

                <form onSubmit={this.handleSubmit}>
                    <input className="input" type="text" value = {this.state.value}
                               onChange = {this.handleChange} />
                    <input className="button" type="submit" value="Tweet" />
                </form>
                </div>
                <TweetTable tweetArray = {this.state.tweetArray}/>
            </div>
        );
    }
}

export default Form;
