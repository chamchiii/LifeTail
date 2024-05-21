package com.chamchi.backend.util;

import lombok.Getter;

@Getter
public enum ReqeustTypeEnum {
    SUCCESS("success"),
    FAIL("fail")
    ;

    final private String name;

    ReqeustTypeEnum(String name) {
        this.name = name;
    }

}
