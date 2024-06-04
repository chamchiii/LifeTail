package com.chamchi.backend.service.login;

import com.chamchi.backend.config.security.jwt.TokenProvider;
import com.chamchi.backend.customException.CustomUserException;
import com.chamchi.backend.domain.users.Users;
import com.chamchi.backend.dto.login.LoginRequest;
import com.chamchi.backend.dto.login.LoginResponse;
import com.chamchi.backend.dto.login.TokenDto;
import com.chamchi.backend.repository.users.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class AuthService {
    private final AuthenticationManagerBuilder managerBuilder;
    private final UsersRepository usersRepository;
    private final PasswordEncoder passwordEncoder;
    private final TokenProvider tokenProvider;

    @Transactional
    public TokenDto login(LoginRequest loginRequest){
        UsernamePasswordAuthenticationToken authenticationToken = loginRequest.toAuthentication();

        Authentication authentication = managerBuilder.getObject().authenticate(authenticationToken);

        return tokenProvider.generateTokenDto(authentication);
    }

    @Transactional
    public LoginResponse signUp(LoginRequest loginRequest){
        if(usersRepository.existsByUserId(loginRequest.getUserId())){
            throw new CustomUserException("이미 가입된 회원입니다.");
        }
        Users users = loginRequest.toUsers(passwordEncoder);
        return LoginResponse.of(usersRepository.save(users));
    }

}
