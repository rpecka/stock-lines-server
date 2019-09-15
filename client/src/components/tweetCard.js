import React, {Component} from 'react';

class TweetCard extends Component {

    render() {
        return (
            <div>
            <h1>
                {this.props.tweettext}
            </h1>
            </div>

        );
    }
}

export default TweetCard;
