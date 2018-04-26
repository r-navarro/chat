package fr.rnavarro.chat.chatapi

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.cloud.client.discovery.EnableDiscoveryClient
import org.springframework.context.annotation.ComponentScan

@EnableDiscoveryClient
@SpringBootApplication
@ComponentScan("fr.rnavarro.chat.chatapi")
class ChatApiApplication {

    static void main(String[] args) {
        SpringApplication.run ChatApiApplication, args
    }

}
