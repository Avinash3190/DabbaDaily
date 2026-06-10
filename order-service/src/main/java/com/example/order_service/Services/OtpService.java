package com.example.order_service.Services;

import org.springframework.stereotype.Service;

import java.util.Random;

@Service
public class OtpService {

    public Integer generateOtp() {

        return 1000 +
                new Random().nextInt(9000);
    }
}