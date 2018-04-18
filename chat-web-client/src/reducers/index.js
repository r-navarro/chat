import { combineReducers } from 'redux'
import { SHOW_ERROR, SEND_MESSAGE, GET_MESSAGES } from './../actions'


let initialState = { message: 'Hello', chats: [], chatMessage: '' }

const chat = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ERROR:
      return Object.assign({}, state, { error: action.error })
    case GET_MESSAGES:
      state = Object.assign({}, state, { chats: action.messages || [] });
      return state
    case SEND_MESSAGE:
      state = Object.assign({}, state, { chats: action.chats || [] });
      return state
    default:
      return state
  }
}

const chatReducer = combineReducers({
  chat
})

export default chatReducer
