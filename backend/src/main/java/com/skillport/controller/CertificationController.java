package com.skillport.controller;

import com.skillport.model.Certification;
import com.skillport.repository.CertificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/certifications")
@CrossOrigin(origins = "*")
public class CertificationController {

    @Autowired
    private CertificationRepository certificationRepository;

    @GetMapping
    public List<Certification> getAllCertifications() {
        return certificationRepository.findAll();
    }

    @GetMapping("/user/{userId}")
    public List<Certification> getCertificationsByUser(@PathVariable Long userId) {
        return certificationRepository.findByUserId(userId);
    }

    @PostMapping
    public Certification createCertification(@RequestBody Certification certification) {
        return certificationRepository.save(certification);
    }

    @DeleteMapping("/{id}")
    public void deleteCertification(@PathVariable Long id) {
        certificationRepository.deleteById(id);
    }
}