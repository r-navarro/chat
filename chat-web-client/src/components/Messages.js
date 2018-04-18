import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { ChatService } from './../services/ChatService'
import { getMessages } from './../actions'

class Messages extends React.Component {

  componentDidMount() {
    setInterval(() => { this.initChat(); }, 2000);
  }

  initChat() {
    const { getMessages } = this.props;
    const chatService = new ChatService();
    chatService.getMessages().then(data => { getMessages(data) });
  }


  render() {
    const { chats } = this.props;
    return (
      <div>
        <div className="chatroom">
          <h3>Chat erton</h3>
          {<ul className="chats">
            {chats.map((chat) =>
              <li>{chat.message.user} : {chat.message.message}</li>
            )}
          </ul>}
        </div>
      </div >
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    chats: state.chat.chats,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getMessages: (messages) => dispatch(getMessages(messages)),
  }
}

const MessagesConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages)


Messages.propTypes = {
  chats: PropTypes.array.isRequired
}

export default MessagesConnect
