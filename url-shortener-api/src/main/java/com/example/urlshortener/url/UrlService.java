package com.example.urlshortener.url;

import com.example.urlshortener.auth.AuthProvider;
import com.example.urlshortener.exception.BadRequestException;
import com.example.urlshortener.exception.ConflictException;
import com.example.urlshortener.exception.NotFoundException;
import com.example.urlshortener.exception.UnauthorizedException;
import com.example.urlshortener.user.Role;
import com.example.urlshortener.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.view.RedirectView;

import java.util.List;

@Service
public class UrlService {
    @Autowired
    private UrlRepository urlRepository;
    @Autowired
    private AuthProvider authProvider;

    public RedirectView redirectByAlias(String alias) {
        Url url = urlRepository.findByAlias(alias)
                .orElseThrow(NotFoundException::new);
        return new RedirectView(url.getUrl());
    }
    public List<Url> getUrlsFromAuthentication() {
        User user = authProvider.getUserFromAuthentication();

        String creatorId = user.getId();
        String creatorName = user.getUsername();
        return urlRepository.findByCreator(creatorId).stream()
                .peek(e -> e.setCreator(creatorName)).toList();
    }
    public String createUrl(String alias, AddRequest addRequest) {
        User user = authProvider.getUserFromAuthentication();
        String creatorId = user.getId();

        try {
            Url url = new Url(
                    alias,
                    addRequest.getUrl(),
                    creatorId
            );
            urlRepository.save(url);
            return "\"Url created\"";
        }
        catch (DataIntegrityViolationException ex) {
            throw new ConflictException("alias already exists");
        }
    }
    public String updateUrlByAlias(String alias, EditRequest editRequest) {
        if (!editRequest.hasValues()) {
            throw new BadRequestException("The request doesn't have any values");
        }

        User user = authProvider.getUserFromAuthentication();
        String creatorId = user.getId();

        Url url = urlRepository.findByAlias(alias)
                .orElseThrow(NotFoundException::new);

        boolean isCreator = url.getCreator().equals(creatorId);
        boolean isAdmin = user.getRole().equals(Role.ADMIN);
        if (!(isCreator || isAdmin)) {
            throw new UnauthorizedException();
        }

        if (editRequest.getAlias() != null) {
            url.setAlias(editRequest.getAlias());
        }
        if (editRequest.getUrl() != null) {
            url.setUrl(editRequest.getUrl());
        }

        try {
            urlRepository.save(url);
            return "\"Updated url\"";
        }
        catch (DataIntegrityViolationException ex) {
            throw new ConflictException("alias already exists");
        }
    }
    public String deleteUrlByAlias(String alias) {
        User user = authProvider.getUserFromAuthentication();

        String creatorId = user.getId();
        Url url = urlRepository.findByAlias(alias).orElseThrow(NotFoundException::new);

        boolean isCreator = url.getCreator().equals(creatorId);
        boolean isAdmin = user.getRole().equals(Role.ADMIN);
        if (isCreator || isAdmin) {
            urlRepository.deleteByAlias(alias);
            return "\"Deleted url\"";
        }
        throw new UnauthorizedException();
    }
}
