import React, {Component} from 'react';

class TweetCard extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        console.log("rendering");
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