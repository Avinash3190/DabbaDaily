package com.example.notification_service.Service;

import org.springframework.stereotype.Service;

import com.example.notification_service.DTO.NotificationRequest;
import com.example.notification_service.Entity.NotificationLog;
import com.example.notification_service.Repository.NotificationRepository;

@Service
public class NotificationService {
	
	private final EmailService emailService;
    private final SmsService smsService;
    private final NotificationRepository repository;
    
    public NotificationService(EmailService emailService , SmsService smsService , NotificationRepository repository) {
    	
    	this.emailService = emailService;
    	this.smsService = smsService;
    	this.repository = repository;
    }
    
    public String sendNotification(
            NotificationRequest request) {

        if (request.getEmail() != null) {

            emailService.sendEmail(
                    request.getEmail(),
                    request.getSubject(),
                    request.getMessage());

            saveLog(
                    "EMAIL",
                    request.getEmail(),
                    request.getMessage());
        }

        if (request.getMobile() != null) {

            smsService.sendSms(
                    request.getMobile(),
                    request.getMessage());

            saveLog(
                    "SMS",
                    request.getMobile(),
                    request.getMessage());
        }

        return "Notification Sent";
    }

    private void saveLog(
            String type,
            String recipient,
            String message) {

        NotificationLog log =
                new NotificationLog();

        log.setType(type);
        log.setRecipient(recipient);
        log.setMessage(message);
        log.setStatus("SENT");

        repository.save(log);
    }
   
    }


