package com.example.order_service.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.order_service.DTO.OrderRequest;
import com.example.order_service.Entity.Order;
import com.example.order_service.Services.OrderService;

@RestController
@RequestMapping("/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/place")
    public Order placeOrder(
            @RequestBody OrderRequest request) {

        return orderService.placeOrder(request);
    }

    @GetMapping("/user/{userId}")
    public List<Order> getUserOrders(
            @PathVariable Long userId) {

        return orderService.getUserOrders(userId);
    }

    @PostMapping("/verify-otp")
    public String verifyOtp(
            @RequestParam Long orderId,
            @RequestParam Integer otp) {

        return orderService.verifyOtp(orderId, otp);
    }
}
