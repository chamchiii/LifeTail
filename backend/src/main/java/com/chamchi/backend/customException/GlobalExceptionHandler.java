package com.chamchi.backend.customException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(CustomUserException.UserAlreadyExistsException.class)
    public ResponseEntity<String> handleUserAlreadyExistsException(CustomUserException ex) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(ex.getMessage());
    }
    @ExceptionHandler(CustomUserException.NoUserDataException.class)
    public ResponseEntity<String> handleNoUserDataException(CustomUserException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }
}
