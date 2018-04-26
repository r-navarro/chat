package fr.rnavarro.chat.chatapi

import com.mongodb.reactivestreams.client.MongoClient
import com.mongodb.reactivestreams.client.MongoClients
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.cloud.client.discovery.EnableDiscoveryClient
import org.springframework.context.annotation.ComponentScan
import org.springframework.data.mongodb.config.AbstractReactiveMongoConfiguration
import org.springframework.data.mongodb.repository.config.EnableReactiveMongoRepositories

@EnableDiscoveryClient
@SpringBootApplication
@ComponentScan("fr.rnavarro.chat.chatapi")
@EnableReactiveMongoRepositories
class ChatApiApplication extends AbstractReactiveMongoConfiguration {

    static void main(String[] args) {
        SpringApplication.run ChatApiApplication, args
    }

    @Override
    MongoClient reactiveMongoClient() {
        return MongoClients.create()
    }

    @Override
    protected String getDatabaseName() {
        return "test"
    }
}
