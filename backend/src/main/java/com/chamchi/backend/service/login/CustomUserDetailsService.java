package com.chamchi.backend.service.login;

import com.chamchi.backend.domain.users.Users;
import com.chamchi.backend.repository.users.UsersRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Collections;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final UsersRepository usersRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return usersRepository.findByUserId(username).map(this::createUserDetails).orElseThrow(() -> new UsernameNotFoundException(username + " 을 찾을 수 없습니다."));
    }

    public UserDetails createUserDetails(Users users) {
        GrantedAuthority grantedAuthority = new SimpleGrantedAuthority(users.getRole().getValue());

        return new User(
                String.valueOf(users.getUserId()),
                users.getPassword(),
                Collections.singleton(grantedAuthority)
        );
    }
}
