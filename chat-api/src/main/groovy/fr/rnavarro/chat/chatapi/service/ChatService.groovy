package fr.rnavarro.chat.chatapi.service

import fr.rnavarro.chat.chatapi.dto.Block
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux

import java.security.MessageDigest

@Service
class ChatService {

    private blockChain = [] as LinkedList<Block>


    Flux<Block> getChain() {
        return Flux.fromIterable(blockChain)
    }

    Flux<Block> addBlock(Block block) {
        def hash = MessageDigest.getInstance("MD5").digest(block.toString().bytes).encodeHex().toString()
        if (hash.startsWith("00")) {
            block.hash = hash
            if (blockChain) {
                def lastHash = blockChain.last.hash
                if(lastHash != block.previousHash) {
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
