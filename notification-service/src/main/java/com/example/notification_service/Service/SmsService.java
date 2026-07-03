package com.example.notification_service.Service;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class SmsService {

    @Value("${msg91.authkey}")
    private String authKey;

    @Value("${msg91.sender}")
    private String sender;

    @Value("${msg91.route}")
    private String route;

    private final RestTemplate restTemplate = new RestTemplate();

    public String sendSms(String mobile, String message) {

        String url =
                "https://api.msg91.com/api/sendhttp.php" +
                "?authkey=" + authKey +
                "&mobiles=" + mobile +
                "&message=" + URLEncoder.encode(message, StandardCharsets.UTF_8) +
                "&sender=" + sender +
                "&route=" + route +
                "&country=91";

        return restTemplate.getForObject(url, String.class);
    }
}