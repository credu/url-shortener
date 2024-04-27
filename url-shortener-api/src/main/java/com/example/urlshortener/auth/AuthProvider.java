package com.example.urlshortener.auth;

import com.example.urlshortener.exception.UnauthorizedException;
import com.example.urlshortener.user.User;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class AuthProvider {
    public User getUserFromAuthentication() {
        Object authentication = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (authentication instanceof User) {
            return (User) authentication;
        }
        throw new UnauthorizedException("The user not exists");
    }
}
