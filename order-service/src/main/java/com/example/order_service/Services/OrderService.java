package com.example.order_service.Services;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.order_service.DTO.ItemRequest;
import com.example.order_service.DTO.MenuResponse;
import com.example.order_service.DTO.OrderRequest;
import com.example.order_service.DTO.UserResponse;
import com.example.order_service.Entity.Order;
import com.example.order_service.Entity.OrderItem;
import com.example.order_service.Entity.OrderStatus;
import com.example.order_service.Repository.OrderRepository;
import com.example.order_service.feign.MenuClient;
import com.example.order_service.feign.UserClient;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final UserClient userClient;
    private final MenuClient menuClient;
    private final OtpService otpService;

    public OrderService(OrderRepository orderRepository,
                        UserClient userClient,
                        MenuClient menuClient,
                        OtpService otpService) {

        this.orderRepository = orderRepository;
        this.userClient = userClient;
        this.menuClient = menuClient;
        this.otpService = otpService;
    }

    public Order placeOrder(OrderRequest request) {

        UserResponse user =
                userClient.getUser(request.getUserId());

        Order order = new Order();

        order.setUserId(user.getId());
        order.setCustomername(user.getFullName());
        order.setMobile(user.getPhone());
        order.setAddress(request.getAddress());
        order.setOrderDate(LocalDateTime.now());
        order.setStatus(OrderStatus.PLACED);
        order.setPaymentMode(request.getPaymentMode());
        order.setPaymentStatus("PENDING");

        double total = 0;

        List<OrderItem> orderItems = new ArrayList<>();

        for(ItemRequest item : request.getItems()) {

            MenuResponse menu =
                    menuClient.getMenu(item.getMenuId());

            OrderItem orderItem = new OrderItem();

            orderItem.setMenuId(menu.getId());
            orderItem.setItemName(menu.getName());
            orderItem.setPrice(menu.getPrice());
            orderItem.setQuantity(item.getQuantity());
            orderItem.setOrder(order);

            total += menu.getPrice() * item.getQuantity();

            orderItems.add(orderItem);
        }

        order.setItems(orderItems);
        order.setTotalAmount(total);

        return orderRepository.save(order);
    }

    public List<Order> getUserOrders(Long userId) {

        return orderRepository.findByUserId(userId);
    }

    public List<Order> getAllOrders() {

        return orderRepository.findAll();
    }

    public Order updateStatus(Long orderId,
                              OrderStatus status) {

        Order order =
                orderRepository.findById(orderId)
                        .orElseThrow();

        order.setStatus(status);

        if(status == OrderStatus.OUT_FOR_DELIVERY
                && order.getPaymentMode().equalsIgnoreCase("COD")) {

            Integer otp = otpService.generateOtp();

            order.setDeliveryOtp(otp);

            System.out.println(
                    "Customer OTP : " + otp);
        }

        return orderRepository.save(order);
    }

    public String verifyOtp(Long orderId,
                            Integer otp) {

        Order order =
                orderRepository.findById(orderId)
                        .orElseThrow();

        if(order.getDeliveryOtp().equals(otp)) {

            order.setOtpVerified(true);
            order.setStatus(OrderStatus.DELIVERED);

            orderRepository.save(order);

            return "Delivered Successfully";
        }

        return "Invalid OTP";
    }
}