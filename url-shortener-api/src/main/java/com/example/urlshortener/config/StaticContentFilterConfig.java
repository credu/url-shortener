package com.example.urlshortener.config;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;

@Component
public class StaticContentFilterConfig implements Filter {
    private final List<String> viewList = List.of("/", "/login", "/register");

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest  req = (HttpServletRequest)  request;
        HttpServletResponse res = (HttpServletResponse) response;

        String path = req.getServletPath();

        boolean isAView = viewList.contains(path);
        if (isAView) {
            serveHtmlResource(res);
        } else {
            chain.doFilter(req, res);
        }
    }

    private void serveHtmlResource(HttpServletResponse response) throws IOException {
        String indexPath = "public/index.html";
        InputStream inputStream = Thread.currentThread()
                .getContextClassLoader()
                .getResourceAsStream(indexPath);

        if (inputStream == null) {
            response.sendError(HttpStatus.NOT_FOUND.value(), HttpStatus.NOT_FOUND.getReasonPhrase());
            return;
        }

        response.setContentType("text/html");
        inputStream.transferTo(response.getOutputStream());
    }
}
