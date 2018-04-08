import { connect } from 'react-redux'
import { helloWorld, reset, sendMessage } from './../actions'
import Hello from './../components/Hello'

const mapStateToProps = (state, ownProps) => {
  console.log('mapStateToProps', state, ownProps)
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
    sendMessage: () => {
      console.log('sendMessage',dispatch, ownProps);
      dispatch(sendMessage());
    }
  }
}

const HelloWorld = connect(
  mapStateToProps,
  mapDispatchToProps
)(Hello)

export default HelloWorld
