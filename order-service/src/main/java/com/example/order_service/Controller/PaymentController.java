package com.example.order_service.Controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.order_service.DTO.PaymentRequest;
import com.example.order_service.Services.PaymentService;

@RestController
@RequestMapping("/payments")
public class PaymentController {

    private final PaymentService paymentService;

    public PaymentController(
            PaymentService paymentService) {

        this.paymentService = paymentService;
    }

    @PostMapping("/create-order")
    public String createPayment(
            @RequestBody PaymentRequest request)
            throws Exception {

        return paymentService
                .createPayment(
                        request.getAmount());
    }
}