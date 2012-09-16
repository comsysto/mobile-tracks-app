package com.comsysto.labs;

import org.junit.Test;
import org.springframework.security.crypto.password.StandardPasswordEncoder;

public class StandardPasswordEncoderTest {

    @Test
    public void encodeTest() {
        StandardPasswordEncoder encoder = new StandardPasswordEncoder();
        String joe = encoder.encode("scott");
    }
}