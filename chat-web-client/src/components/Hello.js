import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { helloWorld, reset, sendMessage } from './../actions'

class Hello extends React.Component {

  constructor(props) {
    super(props);
    this.sendMessageClick = this.sendMessageClick.bind(this);
    this.userTextInput = React.createRef();
    this.messageTextInput = React.createRef();
  }

  sendMessageClick() {
    const { onSendMessage } = this.props;
    if (!this.messageTextInput.value.trim() || !this.userTextInput.value) {
      return;
    }
    onSendMessage(this.userTextInput.value, this.messageTextInput.value);
    this.messageTextInput.value = '';
  }

  render() {
    const { onClick, reset, message, chats } = this.props;
    return (
      <div>
        <div>
          <h1>{message}</h1>
          <button onClick={onClick}>Click</button>
          &nbsp;
      <button onClick={reset}>Reset</button>
        </div>
        <div className="chatroom">
          <h3>Chat erton</h3>
          <ul className="chats">
            {chats.map((chat) =>
              <li>{chat.user} : {chat.message}</li>
            )}
          </ul>
          <input type="text" ref={node => this.userTextInput = node} />
          <input type="text" ref={node => this.messageTextInput = node} />
          <button onClick={this.sendMessageClick}>Click</button>
        </div>
      </div >
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    message: state.helloWorld.message,
    chats: state.helloWorld.chats,
    chatMessage: state.helloWorld.chatMessage
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => dispatch(helloWorld()),
    reset: () => dispatch(reset()),
    onSendMessage: (user, chatMessage) => dispatch(sendMessage(user, chatMessage))
  }
}

const HelloConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(Hello)


Hello.propTypes = {
  onClick: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  chats: PropTypes.array.isRequired
}

export default HelloConnect
