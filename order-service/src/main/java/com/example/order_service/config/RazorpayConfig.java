package com.example.order_service.config;

import com.razorpay.RazorpayClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RazorpayConfig {

    @Bean
    public RazorpayClient razorpayClient()
            throws Exception {

        return new RazorpayClient(
                "rzp_test_xxxxx",
                "secret_key"
        );
    }
}