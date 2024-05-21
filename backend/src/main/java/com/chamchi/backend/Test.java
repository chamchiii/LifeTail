package com.chamchi.backend;

import java.security.SecureRandom;
import java.util.Base64;

public class Test {
    public static void main(String[] args) {
        String randomKey = generateRandomKey(64);
        System.out.println("안전한 랜덤 문자열(512비트 이상): " + randomKey);
    }
    public static String generateRandomKey(int length) {
        SecureRandom secureRandom = new SecureRandom();
        byte[] randomBytes = new byte[length];
        secureRandom.nextBytes(randomBytes);
        return Base64.getUrlEncoder().withoutPadding().encodeToString(randomBytes);
    }
}
