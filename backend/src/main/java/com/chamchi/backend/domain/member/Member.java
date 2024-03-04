package com.chamchi.backend.domain.member;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Member {

    @Id
    private Long id = null;
    private String name;
    private Integer age;

    public Member(Long id, String name, Integer age) {
        this.id = id;
        this.name = name;
        this.age = age;
    }
}
