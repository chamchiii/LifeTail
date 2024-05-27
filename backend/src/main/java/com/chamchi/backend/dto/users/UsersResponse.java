package com.chamchi.backend.dto.users;

import com.chamchi.backend.domain.users.Users;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UsersResponse {
    private Integer id;
    private String name;
    private String userId;
    private String email;
//    @Enumerated(EnumType.STRING)
//    private Provider provider;
//    @Enumerated(EnumType.STRING)
//    private Role role;

    public UsersResponse(Integer id, String name, String userId, String email/*, Provider provider, Role role*/) {
        this.id = id;
        this.name = name;
        this.userId = userId;
        this.email = email;
//        this.provider = provider;
//        this.role = role;
    }

    public UsersResponse(Users users) {
        this.id = users.getId();
        this.name = users.getName();
        this.userId = users.getUserId();
        this.email = users.getEmail();
//        this.provider = users.getProvider();
//        this.role = users.getRole();
    }

    @Override
    public String toString() {
        return "UsersResponse{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", userId='" + userId + '\'' +
                ", email='" + email + '\'' +
//                ", provider='" + provider + '\'' +
                '}';
    }
}
