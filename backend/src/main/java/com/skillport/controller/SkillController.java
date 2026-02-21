package com.skillport.controller;

import com.skillport.model.Skill;
import com.skillport.repository.SkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/skills")
@CrossOrigin(origins = "*")
public class SkillController {

    @Autowired
    private SkillRepository skillRepository;

    @GetMapping("/user/{userId}")
    public List<Skill> getSkillsByUser(@PathVariable Long userId) {
        return skillRepository.findByUserId(userId);
    }

    @PostMapping
    public Skill addSkill(@RequestBody Skill skill) {
        return skillRepository.save(skill);
    }

    @DeleteMapping("/{id}")
    public void removeSkill(@PathVariable Long id) {
        skillRepository.deleteById(id);
    }
}