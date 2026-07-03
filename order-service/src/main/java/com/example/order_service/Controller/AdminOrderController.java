package com.example.order_service.Controller;

import org.springframework.web.bind.annotation.*;

import com.example.order_service.Entity.Order;
import com.example.order_service.Entity.OrderStatus;
import com.example.order_service.Services.OrderService;

import java.util.List;

@RestController
@RequestMapping("/admin/orders")
public class AdminOrderController {

    private final OrderService orderService;

    public AdminOrderController(
            OrderService orderService) {

        this.orderService = orderService;
    }

    @GetMapping
    public List<Order> getAllOrders() {

        return orderService.getAllOrders();
    }

    @PutMapping("/{id}/status")
    public Order updateStatus(
            @PathVariable Long id,
            @RequestParam OrderStatus status) {

        return orderService
                .updateStatus(id, status);
    }
}
