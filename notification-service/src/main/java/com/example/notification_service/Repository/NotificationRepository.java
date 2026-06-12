package com.example.notification_service.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.notification_service.Entity.NotificationLog;

@Repository
public interface NotificationRepository extends JpaRepository<NotificationLog, Long> {

}
