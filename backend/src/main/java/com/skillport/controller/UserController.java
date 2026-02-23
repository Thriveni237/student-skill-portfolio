package com.skillport.controller;

import com.skillport.model.User;
import com.skillport.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    // 🔹 Get all users (Admin / Testing)
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // 🔹 Register / Signup
    @PostMapping("/signup")
    public User signup(@RequestBody User user) {
        // simple duplicate email check
        User existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser != null) {
            return null; // frontend will handle this
        }
        return userRepository.save(user);
    }

    // 🔹 Login
    @PostMapping("/login")
    public User login(@RequestBody User loginUser) {
        User user = userRepository.findByEmail(loginUser.getEmail());
        if (user != null && user.getPassword().equals(loginUser.getPassword())) {
            return user;
        }
        return null; // invalid credentials
    }

    // 🔹 Get user by ID
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userRepository.findById(id).orElse(null);
    }
}