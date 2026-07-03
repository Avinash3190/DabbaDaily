package com.example.order_service.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.example.order_service.DTO.MenuResponse;

@FeignClient(name = "MENU-SERVICE")
public interface MenuClient {

    @GetMapping("/menus/{id}")
    MenuResponse getMenu(
            @PathVariable Long id);
}