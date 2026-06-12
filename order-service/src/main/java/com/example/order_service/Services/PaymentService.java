package com.example.order_service.Services;

import org.json.JSONObject;
import org.springframework.stereotype.Service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
@Service
public class PaymentService {

    private final RazorpayClient razorpayClient;

    public PaymentService(RazorpayClient razorpayClient) {
        this.razorpayClient = razorpayClient;
    }

    public String createPayment(Double amount)
            throws Exception {

        JSONObject options = new JSONObject();

        options.put("amount", amount * 100);
        options.put("currency", "INR");
        options.put("receipt",
                "receipt_" + System.currentTimeMillis());

        Order order =
                razorpayClient.orders.create(options);

        return order.toString();
    }
}