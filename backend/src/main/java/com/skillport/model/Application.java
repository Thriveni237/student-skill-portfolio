package com.skillport.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "applications")
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long studentId;
    private Long jobId;
    
    private String status = "Pending"; // Pending, Interviewing, Accepted, Rejected
    private LocalDateTime appliedAt = LocalDateTime.now();

    // Helper fields for frontend display (simplified for this implementation)
    private String jobTitle;
    private String companyName;
}