package fr.rnavarro.discovery.discoveryserver

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer

@SpringBootApplication
@EnableEurekaServer
class DiscoveryServerApplication {

	static void main(String[] args) {
		SpringApplication.run DiscoveryServerApplication, args
	}
}
