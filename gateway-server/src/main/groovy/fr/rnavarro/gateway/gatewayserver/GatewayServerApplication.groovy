package fr.rnavarro.gateway.gatewayserver

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.cloud.client.discovery.EnableDiscoveryClient
import org.springframework.cloud.netflix.zuul.EnableZuulProxy
import org.springframework.context.annotation.Bean
import org.springframework.web.cors.CorsConfiguration
import org.springframework.web.cors.UrlBasedCorsConfigurationSource
import org.springframework.web.filter.CorsFilter

@EnableZuulProxy
//@EnableDiscoveryClient
@SpringBootApplication
class GatewayServerApplication {

    static void main(String[] args) {
        SpringApplication.run GatewayServerApplication, args
    }

    @Bean
    CorsFilter corsFilter() {
        final UrlBasedCorsConfigurationSource source = new
                UrlBasedCorsConfigurationSource()
        final CorsConfiguration config = new CorsConfiguration()
        config.setAllowCredentials(true)
        config.addAllowedOrigin("*")
        config.addExposedHeader("Content-Type")
        config.addExposedHeader("Authorization")
        config.addExposedHeader("Accept")
        config.addExposedHeader("Origin")
        config.addAllowedHeader("*")
        config.addAllowedMethod("*")
        source.registerCorsConfiguration("/**", config)
        return new CorsFilter(source)
    }
}