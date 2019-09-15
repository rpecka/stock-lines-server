import React, {Component} from "react";
import TweetCard from '../../components/tweetCard';

class Form extends Component {
state= {
     tweetArray : []
};
  constructor(props) {
      super(props);
      this.state = {value: ''};

      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
      this.setState({value: event.target.value});
  }

  handleSubmit(event) {
      event.preventDefault();
      let tweetCards = [this.state.tweetArray];
      console.log('this.state.tweetArray');
     tweetCards.push(this.state.value);
     this.setState({tweetArray: tweetCards})
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
                <TweetCard tweettext = {this.state.tweetArray}/>
            </div>
        );
    }
}

export default Form;