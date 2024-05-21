package com.chamchi.backend.dto.users;

import com.chamchi.backend.domain.users.Users;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserProfile {
    private String id;
    private String name;

    public UserProfile(String id, String name, String email) {
        this.id = id;
        this.name = name;
    }

    public Users toUsers(){
        return Users.builder().name(name).build();
    }
}
