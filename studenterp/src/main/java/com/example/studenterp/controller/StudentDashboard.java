package com.example.studenterp.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.example.studenterp.dto.StudentProfileResponse;

import com.example.studenterp.services.ProfileService;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("/api/student")
@CrossOrigin(origins="*")
public class StudentDashboard {
    @Autowired
    private ProfileService profileService;

    @GetMapping("/profile")
    public ResponseEntity<StudentProfileResponse> getStudentDetails(@AuthenticationPrincipal UserDetails userDetails ) {
       StudentProfileResponse student=profileService.getStudentByRollNo(userDetails.getUsername());
       
        return ResponseEntity.ok(student);
    }
    @GetMapping("/profile/name")
    public String getStudentName(@AuthenticationPrincipal UserDetails userDetails) {
        String name=profileService.getStudentName(userDetails.getUsername());
        return name;
    }
    @GetMapping("/course/name")
    public String getCourseName(@AuthenticationPrincipal UserDetails userDetails){
        String course_name=profileService.getCourse(userDetails.getUsername());
        return course_name;
    }
    @PostMapping("/profile")
    public ResponseEntity<String> saveStudentDetails(@AuthenticationPrincipal UserDetails userDetails,@RequestBody StudentProfileResponse details){
        String roll_no=userDetails.getUsername();


        profileService.saveOrupdateStudent(roll_no, details);
        return ResponseEntity.ok("Changes Saved Successfully");

    }
    
    


    
}
