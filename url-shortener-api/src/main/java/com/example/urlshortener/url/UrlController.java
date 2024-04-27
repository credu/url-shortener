package com.example.urlshortener.url;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Pattern;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.util.List;

@RestController
@Tag(name = "url", description = "Operations about url")
public class UrlController {
    @Autowired
    UrlService urlService;

    @GetMapping("/{alias}")
    @Operation(summary = "Redirect to url by alias", responses = {
            @ApiResponse(responseCode = "301", description = "Successful redirected", content = @Content),
            @ApiResponse(responseCode = "404", description = "Not found", content = @Content)
    })
    @ResponseStatus(HttpStatus.MOVED_PERMANENTLY)
    public RedirectView index(@PathVariable String alias) {
        return urlService.redirectByAlias(alias);
    }

    @GetMapping("/api/url")
    @Operation(summary = "List all urls created by authentication", security = {@SecurityRequirement(name = "bearer-key")}, responses = {
            @ApiResponse(responseCode = "200", description = "Successful operation", content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = Url.class)))),
            @ApiResponse(responseCode = "401", description = "Not authorized (You are only authorized if you are the url creator or admin)", content = @Content),
    })
    public List<Url> showUrlsCreated() {
        return urlService.getUrlsFromAuthentication();
    }

    @PostMapping("/api/url/{alias}")
    @Operation(summary = "Add alias for url", security = {@SecurityRequirement(name = "bearer-key")}, responses = {
            @ApiResponse(responseCode = "200", description = "Successful operation", content = @Content(mediaType = "application/json", schema = @Schema(type = "String", defaultValue = "Url created"))),
            @ApiResponse(responseCode = "400", description = "Malformed request syntax", content = @Content),
            @ApiResponse(responseCode = "401", description = "Not authorized (You must be authenticated)", content = @Content),
            @ApiResponse(responseCode = "409", description = "Alias already exists", content = @Content(mediaType = "application/json", schema = @Schema(type = "String", defaultValue = "alias already exists"))),
    })
    public String addUrl(
            @Valid @Pattern(regexp = "[a-zA-Z0-9-]+", message = "The Alias must have only letters, numbers or dashes") @PathVariable String alias,
            @Valid @RequestBody AddRequest addRequest
    ) {
        return urlService.createUrl(alias, addRequest);
    }

    @PatchMapping("/api/url/{alias}")
    @Operation(summary = "Edit url alias", security = {@SecurityRequirement(name = "bearer-key")}, responses = {
            @ApiResponse(responseCode = "200", description = "Successful edited", content = @Content(mediaType = "application/json", schema = @Schema(type = "String", defaultValue = "Updated url"))),
            @ApiResponse(responseCode = "400", description = "The request require at least one parameter of these: \"url\" or \"alias\"", content = @Content),
            @ApiResponse(responseCode = "401", description = "Not authorized (You are only authorized if you are a admin or the url creator)", content = @Content),
            @ApiResponse(responseCode = "404", description = "Url not found", content = @Content),
            @ApiResponse(responseCode = "409", description = "Alias already exists", content = @Content(mediaType = "application/json", schema = @Schema(type = "String", defaultValue = "alias already exists"))),
    })
    public String patchUrl(@PathVariable String alias, @Valid @RequestBody EditRequest editRequest) {
        return urlService.updateUrlByAlias(alias, editRequest);
    }

    @DeleteMapping("/api/url/{alias}")
    @Operation(summary = "Delete url alias", security = {@SecurityRequirement(name = "bearer-key")}, responses = {
            @ApiResponse(responseCode = "200", description = "Successful deleted", content = @Content(mediaType = "application/json", schema = @Schema(type = "String", defaultValue = "Deleted url"))),
            @ApiResponse(responseCode = "401", description = "Not authorized (You are only authorized if you are a admin or the url creator)", content = @Content),
            @ApiResponse(responseCode = "404", description = "Url alias not found", content = @Content),
    })
    public String deleteUrl(@PathVariable String alias) {
        return urlService.deleteUrlByAlias(alias);
    }
}
