package com.example.user_service.Services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.user_service.DTO.UserRequest;
import com.example.user_service.Entity.UserProfile;
import com.example.user_service.Repository.UserRepository;

@Service
public class UserService {
	
	private final UserRepository repository;
	
	public UserService(UserRepository repository) {
		
		this.repository = repository;
	}
	// create User
	public UserProfile creatUser(UserRequest request) {
		
		UserProfile user = new UserProfile();
		
		user.setFullName(request.getFullName());
		user.setEmail(request.getEmail());
		user.setPhone(request.getPhone());
		user.setAddress(request.getAddress());
		user.setCity(request.getCity());
		user.setPincode(request.getPincode());
		
		return repository.save(user);
	}
	
	// Get User By User By Id
	
	public UserProfile getUser(Long id) {
		
		return repository.findById(id).orElseThrow(() -> new RuntimeException("User Not Found"));
	}
	
	// Get All User
	public List<UserProfile> getAllUser(){
		
		return repository.findAll();
		
	}
	
	// Update UserProfile 
	
	public UserProfile updateUser(Long id , UserRequest request) {
		
		UserProfile user = getUser(id);
		
		user.setFullName(request.getFullName());
        user.setPhone(request.getPhone());
        user.setAddress(request.getAddress());
        user.setCity(request.getCity());
        user.setPincode(request.getPincode());

        return repository.save(user);
		
	}
	
	// Delete User
	
	public String deleteUser(Long id) {
		repository.deleteById(id);
		
		return "user Deleted Successfully";
	}

}
