package com.skillport.controller;

import com.skillport.model.User;
import com.skillport.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<User> getAllUsers(@RequestParam(required = false) String role) {
        List<User> users = userRepository.findAll();
        if (role != null && !role.isEmpty()) {
            return users.stream()
                    .filter(u -> role.equalsIgnoreCase(u.getRole()))
                    .collect(Collectors.toList());
        }
        return users;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        if (user.getEmail() == null || user.getEmail().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("{\"message\": \"Email is required\"}");
        }

        // Normalize email
        user.setEmail(user.getEmail().toLowerCase().trim());
        
        User existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("{\"message\": \"User already exists with this email\"}");
        }
        
        try {
            User savedUser = userRepository.save(user);
            return ResponseEntity.ok(savedUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("{\"message\": \"Error saving user: " + e.getMessage() + "\"}");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User loginUser) {
        if (loginUser.getEmail() == null || loginUser.getPassword() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("{\"message\": \"Email and password are required\"}");
        }

        String email = loginUser.getEmail().toLowerCase().trim();
        User user = userRepository.findByEmail(email);
        
        if (user != null && user.getPassword().equals(loginUser.getPassword())) {
            return ResponseEntity.ok(user);
        }
        
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
            .body("{\"message\": \"Invalid email or password\"}");
    }

    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userRepository.findById(id).orElse(null);
    }
}