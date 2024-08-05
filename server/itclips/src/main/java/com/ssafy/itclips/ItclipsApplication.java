package com.ssafy.itclips;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class ItclipsApplication {

	public static void main(String[] args) {
		SpringApplication.run(ItclipsApplication.class, args);
	}
}
