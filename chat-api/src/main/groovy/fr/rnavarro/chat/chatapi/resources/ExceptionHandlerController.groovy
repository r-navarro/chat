package fr.rnavarro.chat.chatapi.resources

import fr.rnavarro.chat.chatapi.dto.Message
import fr.rnavarro.chat.chatapi.service.BlockException
import groovy.util.logging.Slf4j
import org.springframework.http.HttpStatus
import org.springframework.web.bind.annotation.ControllerAdvice
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.ResponseBody
import org.springframework.web.bind.annotation.ResponseStatus

import java.time.Instant

@ControllerAdvice
@Slf4j
class ExceptionHandlerController {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(BlockException)
    @ResponseBody
    Message handleBlockError() {
        log.warn("wrong block")
        return new Message(message: 'Wrong block', user: 'sysadmin', timestamp: Instant.now().toEpochMilli())
    }
}
