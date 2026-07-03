package com.example.user_service.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.user_service.DTO.UserRequest;
import com.example.user_service.Entity.UserProfile;
import com.example.user_service.Services.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

	private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }
    
    @PostMapping
    public UserProfile createUser(
            @RequestBody UserRequest request) {

        return service.creatUser(request);
    }
    
    @GetMapping
    public List<UserProfile> getAllUsers(){
    	
    	return service.getAllUser();
    }
    
    @GetMapping("/{id}")
    public UserProfile getUser(@PathVariable Long id) {
    	
    	return service.getUser(id);
    }
    
    
    @PutMapping("/{id}")
    public UserProfile updateUser(
            @PathVariable Long id,
            @RequestBody UserRequest request) {

        return service.updateUser(id, request);
    }

    @DeleteMapping("/{id}")
    public String deleteUser(
            @PathVariable Long id) {

        return service.deleteUser(id);
    }
    
    
    
}
