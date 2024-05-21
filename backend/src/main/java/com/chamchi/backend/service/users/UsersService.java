package com.chamchi.backend.service.users;

import com.chamchi.backend.dto.users.UsersResponse;
import com.chamchi.backend.repository.users.UsersRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UsersService {
    private final UsersRepository usersRepository;

    public UsersService(UsersRepository usersRepository) {
        this.usersRepository = usersRepository;
    }

    @Transactional(readOnly = true)
    public List<UsersResponse> getUsers() {
        return usersRepository.findAll().stream()   //Users로 반환된 리스트릉
                .map(UsersResponse::new)            //UsersResponse로 변환하고
                .toList();                          //List로 만든다
    }
}
