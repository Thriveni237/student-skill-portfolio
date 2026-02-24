package com.skillport.model;

import jakarta.persistence.*;
import lombok.Data;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Data
@Entity
@Table(name = "skills")
public class Skill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String level; // Beginner, Intermediate, Advanced, Expert
    private String category; // Frontend, Backend, Design, Tools, etc.
    private Integer yearsOfExperience;
    private boolean isLearningPath; // If true, it's a skill the user is currently learning

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;
}