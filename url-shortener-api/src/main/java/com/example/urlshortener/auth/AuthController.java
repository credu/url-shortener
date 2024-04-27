package com.example.urlshortener.auth;

import com.example.urlshortener.user.User;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "authentication", description = "Operation about authentications")
public class AuthController {
    @Autowired
    AuthService authService;

    @GetMapping
    @Operation(summary = "List all users", security = {@SecurityRequirement(name = "bearer-key")},
            responses = {
                @ApiResponse(responseCode = "200", description = "Successful operation", content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = User.class)))),
                @ApiResponse(responseCode = "401", description = "Not authorized (You are only authorized if you are admin)", content = @Content)
            }
    )
    public List<User> showUsers() {
        return authService.findAllUsers();
    }

    @PostMapping("/login")
    @Operation(summary = "Login user", responses = {
            @ApiResponse(responseCode = "200", description = "Successful operation", content = @Content(mediaType = "application/json", schema = @Schema(implementation = AuthResponse.class))),
            @ApiResponse(responseCode = "400", description = "Invalid username/password supplied", content = @Content),
            @ApiResponse(responseCode = "401", description = "The username/password are incorrect", content = @Content)
    })
    public AuthResponse loginUser(@Valid @RequestBody AuthRequest request) {
        return authService.loginUser(request);
    }

    @PostMapping("/register")
    @Operation(summary = "Register user", responses = {
            @ApiResponse(responseCode = "201", description = "Successful operation", content = @Content(mediaType = "application/json", schema = @Schema(type = "String", defaultValue = "User created"))),
            @ApiResponse(responseCode = "400", description = "Invalid username/password supplied", content = @Content),
            @ApiResponse(responseCode = "409", description = "The username already exists", content = @Content)
    })
    @ResponseStatus(HttpStatus.CREATED)
    public String registerUser(@Valid @RequestBody AuthRequest request) {
        return authService.registerUser(request);
    }
}
