package fr.rnavarro.chat.chatapi.dto


class Block {
    Message message
    int nonce
    String hash
    String previousHash

    String toString() {
        return message.timestamp + message.message + message.user + previousHash + nonce
    }
}
