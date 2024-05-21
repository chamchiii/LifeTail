package com.chamchi.backend.domain.users;

import com.chamchi.backend.dto.users.UsersResponse;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import com.chamchi.backend.config.security.Role;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "users_id_seq")
    @SequenceGenerator(name = "users_id_seq", sequenceName = "users_id_seq", allocationSize = 1)
    private Long id = null;     //유저번호 - sequence
    private String name;
    private String userId;      // 유저아이디
    private String password;
    private String email;
    //    private String provider;
    @Enumerated(EnumType.STRING)
    private Role role;

    @Builder
    public Users(Long id, String name, String userId, String password, String email, Role role/*, String provider*/) {
        this.id = id;
        this.name = name;
        this.userId = userId;
        this.password = password;
        this.email = email;
//        this.provider = provider;
        if (this.role == null) this.role = Role.USER;
    }

    public Users(UsersResponse usersResponse) {
        this.name = usersResponse.getName();
        this.userId = usersResponse.getUserId();
        this.email = usersResponse.getEmail();
    }

    public Users update(String name, String email) {
        this.name = name;
        this.email = email;
        if (this.role == null) this.role = Role.USER;
        return this;
    }

    public String getRoleKey() {
        return this.role.getKey();
    }
}
