package fr.rnavarro.chat.chatapi.service

import fr.rnavarro.chat.chatapi.dto.Block
import org.springframework.stereotype.Service
import reactor.core.publisher.Flux

import java.security.MessageDigest

@Service
class ChatService {

    private blockChain = [] as LinkedList<Block>


    Flux<Block> getChain(){
        return Flux.fromIterable(blockChain)
    }

    Flux<Block> addBlock(Block block){
        def hash = MessageDigest.getInstance("MD5").digest(block.toString().bytes).encodeHex().toString()
        if(hash.startsWith("00")){
            blockChain << block
        }
        return Flux.fromIterable(blockChain)
    }
}
