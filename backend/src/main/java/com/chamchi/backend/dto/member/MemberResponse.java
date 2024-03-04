package com.chamchi.backend.dto.member;


import com.chamchi.backend.domain.member.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MemberResponse {

    private Long id;
    private String name;
    private Integer age;

    public MemberResponse(Long id, String name, Integer age) {
        this.id = id;
        this.name = name;
        this.age = age;
    }

    public MemberResponse(Member member) {
        this.id = member.getId();
        this.name = member.getName();
        this.age = member.getAge();
    }

    @Override
    public String toString() {
        return "MemberResponse{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", age=" + age +
                '}';
    }
}
