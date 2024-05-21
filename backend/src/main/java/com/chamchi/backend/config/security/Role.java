package com.chamchi.backend.config.security;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Role {
    USER("기본사용자", "USER"),
    ADMIN("관리자", "ADMIN");

    private final String key;
    private final String value;
}
