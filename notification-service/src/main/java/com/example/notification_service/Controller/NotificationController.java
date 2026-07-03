package com.example.notification_service.Controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.notification_service.DTO.NotificationRequest;
import com.example.notification_service.Service.NotificationService;

@RestController
@RequestMapping("/notifications")
public class NotificationController {
	
	
	private final NotificationService service;

	
	public NotificationController(NotificationService service) {
		
		this.service = service;
	}
    @PostMapping("/send")
    public String sendNotification(
            @RequestBody NotificationRequest request) {

        return service.sendNotification(request);
    }

}
