package com.ssafy.itclips.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocketMessageBroker
@RequiredArgsConstructor
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer   {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/api/sub");
        registry.setApplicationDestinationPrefixes("/api/pub");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/api/ws")
                .setAllowedOrigins("http://127.0.0.1:5500","https://localhost:3000","https://i11d205.p.ssafy.io")
                .withSockJS();
        registry.addEndpoint("/api/ws")
                .setAllowedOrigins("http://127.0.0.1:5500");
//                .setAllowedOriginPatterns("*");
    }
//
//    //인터셉터
//    @Override
//    public void configureClientInboundChannel(ChannelRegistration registration) {
//        registration.interceptors(stompHandler);
//    }

}
