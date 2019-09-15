import React, {Component} from 'react';
import TweetCard from './tweetCard';

class TweetTable extends Component {

    render() {
        return (
            <div className="tweet">
                {this.props.tweetArray.map((tweet) => (
                    <TweetCard tweettext={tweet}/>
                ))}
            </div>

        );
    }
}

export default TweetTable;
