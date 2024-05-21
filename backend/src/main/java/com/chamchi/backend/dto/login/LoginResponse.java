package com.chamchi.backend.dto.login;

import com.chamchi.backend.domain.users.Users;
import lombok.*;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LoginResponse {
    private String userId;

    public static LoginResponse of(Users users) {
        return LoginResponse.builder().userId(users.getUserId()).build();
    }
}
