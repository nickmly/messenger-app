import React, {Component} from 'react';
import Message from './Message';

class MessageList extends Component {
    constructor(props){
        super(props);
    }

    render() {
        var style = {
            listStyle: 'none'
        }
        return (
            <ul style={style}>
                <li>
                    <Message 
                        title="Test Message 1" 
                        body="Shitter"
                    />
                </li>
                <li>
                    <Message 
                        title="Test Message 2" 
                        body="Shitter"
                    />
                </li>
                <li>
                    <Message 
                        title="Test Message 3" 
                        body="Shitter"
                    />
                </li>
            </ul>
        );
    }
}
export default MessageList;