package fr.rnavarro.chat.chatapi.resources

import fr.rnavarro.chat.chatapi.dto.Block
import fr.rnavarro.chat.chatapi.service.ChatService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RestController
import reactor.core.publisher.Flux

@RestController
class ChatController {

    @Autowired
    ChatService chatService

    @GetMapping("/chats")
    Flux<Block> getAll() {
        return chatService.chain
    }

    @PostMapping("/chats")
    Flux<Block> addBlock(@RequestBody Block block) {
        return chatService.addBlock(block)
    }
}
