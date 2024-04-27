package com.example.urlshortener.auth;

import com.example.urlshortener.exception.ConflictException;
import com.example.urlshortener.exception.UnauthorizedException;
import com.example.urlshortener.jwt.JwtService;
import com.example.urlshortener.user.Role;
import com.example.urlshortener.user.User;
import com.example.urlshortener.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;

@Service
public class AuthService {
    @Autowired
    AuthenticationManager authenticationManager;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    UserRepository userRepository;
    @Autowired
    JwtService jwtService;

    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    public AuthResponse loginUser(AuthRequest request) {
        String username = request.getUsername();
        String password = request.getPassword();

        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
            User user = (User) authentication.getPrincipal();
            String userToken = jwtService.getUserToken(user);
            return new AuthResponse(userToken);
        }
        catch (Exception ex) {
            throw new UnauthorizedException();
        }
    }

    public String registerUser(AuthRequest request) {
        String username = request.getUsername();
        String password = passwordEncoder.encode(request.getPassword());

        try {
            userRepository.save(new User(username, password, Role.USER));
            return "\"User created\"";
        } catch (Exception ex) {
            throw new ConflictException();
        }
    }
}
