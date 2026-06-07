package com.example.api_gateways;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ApiGatewaysApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApiGatewaysApplication.class, args);
		System.out.println("ApiGateway Server");
	}

}
