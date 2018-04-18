export const SHOW_ERROR = 'SHOW_ERROR'
export const SEND_MESSAGE = 'SEND_MESSAGE'
export const GET_MESSAGES = 'GET_MESSAGES'

export const sendMessage = (chats) => {
  return {
    type: SEND_MESSAGE,
    chats,
  }
}

export const showError = (error) => {
  return {
    type: SHOW_ERROR,
    error,
  }
}

export const getMessages = (messages) => {
  return {
    type: GET_MESSAGES,
    messages,
  }
}