package com.example.urlshortener.exception;

import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.view.RedirectView;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<Object> messageNotReadableException() {
        return ResponseEntity.status(400).build();
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> constraintViolationException(MethodArgumentNotValidException ex, WebRequest request) {
        Map<String, List<String>> result = new HashMap<>();

        List<String> errors = new ArrayList<>();
        ex.getFieldErrors().forEach(cv -> errors.add(cv.getDefaultMessage()));
        result.put("errors", errors);

        return ResponseEntity.status(400).body(result);
    }
}
