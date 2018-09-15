package com.smoothstack.lmsadministrator;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class LmsadministratorApplication {

	public static void main(String[] args) {
		SpringApplication.run(LmsadministratorApplication.class, args);
	}
}
