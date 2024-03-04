package com.chamchi.backend.repository.member;

import com.chamchi.backend.domain.member.Member;
import com.chamchi.backend.dto.member.MemberResponse;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MemberRepository extends JpaRepository<Member, Long> {

}
