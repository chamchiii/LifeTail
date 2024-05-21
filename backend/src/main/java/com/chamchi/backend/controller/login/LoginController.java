package com.chamchi.backend.controller.login;

import com.chamchi.backend.dto.login.LoginRequest;
import com.chamchi.backend.dto.login.LoginResponse;
import com.chamchi.backend.dto.login.TokenDto;
import com.chamchi.backend.service.login.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class LoginController {
    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<TokenDto> login(@RequestBody LoginRequest loginRequest){
        return ResponseEntity.ok(authService.login(loginRequest));
    }

    @PostMapping("/signup")
    public ResponseEntity<LoginResponse> signUp(@RequestBody LoginRequest loginRequest){
        return ResponseEntity.ok(authService.signUp(loginRequest));
    }
}
