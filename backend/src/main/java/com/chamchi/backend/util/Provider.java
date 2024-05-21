package com.chamchi.backend.util;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Provider {
    Google("google");

    private final String key;
}
