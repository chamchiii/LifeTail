package com.chamchi.backend.dto.login;

import com.chamchi.backend.domain.users.Users;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LoginRequest {
    private String userId;
    private String password;

    public Users toUsers(PasswordEncoder passwordEncoder){
        return Users.builder().userId(userId).password(passwordEncoder.encode(password)).build();
    }

    public UsernamePasswordAuthenticationToken toAuthentication() {
        return new UsernamePasswordAuthenticationToken(userId, password);
    }
}
