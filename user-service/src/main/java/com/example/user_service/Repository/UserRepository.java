package com.example.user_service.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.user_service.Entity.UserProfile;

public interface UserRepository extends JpaRepository<UserProfile ,Long> {

	Optional<UserProfile> findByEmail(String email);
}
