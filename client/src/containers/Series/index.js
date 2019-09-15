import React, {Component} from "react";
import TweetTable from '../../components/TweetTable';

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
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Tweet:
                        <input type="text" value = {this.state.value}
                               onChange = {this.handleChange} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                <TweetTable tweetArray = {this.state.tweetArray}/>
            </div>
        );
    }
}

export default Form;
