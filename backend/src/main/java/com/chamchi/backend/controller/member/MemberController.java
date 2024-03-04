package com.chamchi.backend.controller.member;

import com.chamchi.backend.domain.member.Member;
import com.chamchi.backend.dto.member.MemberResponse;
import com.chamchi.backend.service.member.MemberService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class MemberController {
    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping("/api/test")
    public List<MemberResponse> test(){
        List<MemberResponse> memberResponses = memberService.getUsers();
        System.out.println(memberResponses.toString());
        return memberResponses;
    }
}
