package com.skillport.model;

import jakarta.persistence.*;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Data
@Entity
@Table(name = "projects")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    
    @Column(length = 1000)
    private String description;
    
    private String link;
    private String github;
    private String tags; // Stored as comma-separated string for simplicity

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;
}