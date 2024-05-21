package com.chamchi.backend.controller.users;

import com.chamchi.backend.dto.users.UsersResponse;
import com.chamchi.backend.service.users.UsersService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class UsersController {
    private final UsersService usersService;

    @GetMapping("/api")
    public List<UsersResponse> getUsers(){
        List<UsersResponse> usersResponses = usersService.getUsers();
        System.out.println(usersResponses.toString());
        return usersService.getUsers();
    }


}
