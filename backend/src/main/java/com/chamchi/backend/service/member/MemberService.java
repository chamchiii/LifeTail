package com.chamchi.backend.service.member;

import com.chamchi.backend.dto.member.MemberResponse;
import com.chamchi.backend.repository.member.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MemberService {
    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Transactional(readOnly = true)
    public List<MemberResponse> getUsers() {
        List<MemberResponse> memberResponses = memberRepository.findAll().stream()
                .map(MemberResponse::new)
                .toList();
        return memberResponses;
    }
}
