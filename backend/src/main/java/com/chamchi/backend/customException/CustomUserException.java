package com.chamchi.backend.customException;

import java.util.function.Supplier;

public class CustomUserException extends RuntimeException{
    public CustomUserException(String message){
        super(message);
    }

    public static class UserAlreadyExistsException extends CustomUserException {
        public UserAlreadyExistsException(String message) {
            super(message);
        }
    }

    public static class NoUserDataException extends  CustomUserException {
        public NoUserDataException(String message){
            super(message);
        }
    }
}
