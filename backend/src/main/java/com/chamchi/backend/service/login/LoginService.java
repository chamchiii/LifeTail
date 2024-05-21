package com.chamchi.backend.service.login;

import com.chamchi.backend.config.SecurityUtil;
import com.chamchi.backend.dto.login.LoginResponse;
import com.chamchi.backend.repository.users.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class LoginService {
    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;

    public LoginResponse getMyInfoBySecurity() {
        return usersRepository.findByUserId(SecurityUtil.getCurrentUserId())
                .map(LoginResponse::of)
                .orElseThrow(() -> new RuntimeException("로그인 유저 정보가 없습니다."));
    }
}
