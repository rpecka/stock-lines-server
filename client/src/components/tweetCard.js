import React, {Component} from 'react';
import Trump from './Unknown.jpg';
import './tweetCard.css';

class TweetCard extends Component {

    render() {
        return (
            <div className="tweet">
                <div className="handle">
                <img src={Trump} />
                <h3> "Donald J. Trump" </h3>
                </div>
            <p>
                {this.props.tweettext}
            </p>
            </div>

        );
    }
}

export default TweetCard;
