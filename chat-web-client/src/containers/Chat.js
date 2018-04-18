import React from 'react';
import Messages from './../components/Messages'
import MessagesSender from './../components/MessagesSender'

class Chat extends React.Component {


  render() {
    return (
      <div>
        <Messages />
        <div className="chatroom">
          <MessagesSender />
        </div>
      </div >
    );
  }
}

export default Chat