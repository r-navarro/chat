package fr.rnavarro.chat.chatapi.service

import fr.rnavarro.chat.chatapi.dto.Block
import fr.rnavarro.chat.chatapi.dto.Message
import org.springframework.beans.factory.annotation.Value
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux

import javax.annotation.PostConstruct
import java.security.MessageDigest
import java.time.Instant

@Service
class ChatService {

    private blockChain = [] as LinkedList<Block>

    @Value('${spring.application.name}')
    String applicationName

    @Value('${server.port}')
    String port

    @PostConstruct
    private void generateFirstBlock() {
        def message = new Message(message: "welcome on $applicationName : $port chat", user: 'admin', timestamp: Instant.now().toEpochMilli())
        def firstBlock = new Block(message: message, hash: "00")
        blockChain << firstBlock
    }

    Flux<Block> getChain() {
        return Flux.fromIterable(blockChain)
    }

    Flux<Block> addBlock(Block block) {
        def hash = MessageDigest.getInstance("MD5").digest(block.toString().getBytes("UTF-8")).encodeHex().toString()
        if (hash.startsWith("00")) {
            block.hash = hash
            if (blockChain) {
                def lastHash = blockChain.last.hash
                if (lastHash != block.previousHash) {
                    throw new BlockException('Wrong block in the chain')
                }
                block.previousHash = lastHash
            }
            blockChain << block
            return Flux.fromIterable(blockChain)
        }
        throw new BlockException('Wrong block in the chain')
    }
}
