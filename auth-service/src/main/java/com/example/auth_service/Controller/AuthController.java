package com.example.auth_service.Controller;

import com.example.auth_service.entity.User;
import com.example.auth_service.service.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.example.auth_service.Repository.UserRepository;

@RestController
@RequestMapping("/auth")
public class AuthController {
	
	 private final UserRepository userRepository;
	    private final PasswordEncoder passwordEncoder;
	    private final JwtService jwtService;
	    
	    public AuthController(UserRepository userRepository ,PasswordEncoder passwordEncoder , JwtService jwtService ) {
	    	
	    	this.userRepository = userRepository;
	    	this.passwordEncoder = passwordEncoder;
	    	this.jwtService = jwtService;
	    }
	    
	    @PostMapping("/register")
	    public String register(@RequestBody User user) {

	        user.setPassword(passwordEncoder.encode(user.getPassword()));
	        userRepository.save(user);

	        return "User Registered";
	    }

	    
	    @PostMapping("/login")
	    public String login(@RequestBody User user ) {

	        User dbUser = userRepository.findByEmail(user.getEmail()).orElseThrow();

	        if (passwordEncoder.matches(user.getPassword(), dbUser.getPassword())) {
	            return jwtService.generateToken(user.getEmail() );
	        }

	        return "Invalid Credentials";
	    }
	    
	    
	    
	    

}
