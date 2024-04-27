package com.example.urlshortener.config;

import com.example.urlshortener.url.Url;
import com.example.urlshortener.url.UrlRepository;
import com.example.urlshortener.user.Role;
import com.example.urlshortener.user.User;
import com.example.urlshortener.user.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class MongoInitConfig {
    @Bean
    CommandLineRunner commandLineRunner(UserRepository userRepository, PasswordEncoder passwordEncoder, UrlRepository urlRepository) {
        return args -> {
            if (userRepository.findAll().isEmpty()) {
                User user = userRepository.save(new User(
                        "user",
                        passwordEncoder.encode("1234"),
                        Role.USER
                ));
                userRepository.save(new User(
                        "admin",
                        passwordEncoder.encode("1234"),
                        Role.ADMIN
                ));
                log.info("User demo created");
                if (urlRepository.findAll().isEmpty()) {
                    urlRepository.save(new Url("demo", "https://www.google.com", user.getId()));
                    log.info("Url demo created");
                };
            }
        };
    }
}
