import React, {Component} from 'react';
import TweetCard from './tweetCard';

class TweetTable extends Component {

    render() {
        return (
            <div>
                <table>
                    {this.props.tweetArray.map((tweet) => (
                      <tr key={tweet}>
                          <td>
                          <TweetCard tweettext={tweet}/>
                          </td>
                      </tr>
                    ))}
                </table>
            </div>

        );
    }
}

export default TweetTable;
