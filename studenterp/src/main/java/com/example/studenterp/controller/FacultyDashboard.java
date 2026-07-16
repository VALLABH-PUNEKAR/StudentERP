package com.example.studenterp.controller;

import com.example.studenterp.repository.FacultyRepository;
import com.example.studenterp.repository.UserRepository;
import com.example.studenterp.services.ProfileService;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.studenterp.dto.CourseDetails;
import com.example.studenterp.dto.FacultyName;
import com.example.studenterp.dto.FacultyProfileRequest;
import com.example.studenterp.dto.FacultyProfileResponse;
import com.example.studenterp.dto.StudentList;
import com.example.studenterp.repository.CourseRepository;
import com.example.studenterp.repository.FacultyNameRepository;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/faculty")
@CrossOrigin(origins ="*")
public class FacultyDashboard {
    
    @Autowired
    private FacultyNameRepository facultyNameRepository;
    @Autowired
    private ProfileService profileService;
    @Autowired
    private CourseRepository courseRepository;

    
   
    @GetMapping("/profile/name")
    public String getFacultyName(@AuthenticationPrincipal UserDetails userDetails){
        Optional<FacultyName> name=facultyNameRepository.findNameByUserId(userDetails.getUsername());
        String fname=name.map(FacultyName::getName).orElse("Profile Incomplete");
        return fname;
    }
    @PostMapping("/profile")
    public ResponseEntity<String> saveFacultyDetails(@AuthenticationPrincipal UserDetails userDetails,@RequestBody FacultyProfileRequest fd){
        profileService.saveOrupdateFaculty(userDetails.getUsername(), fd);
      
        return ResponseEntity.ok("Changes Saved Successfully");
    }
    @GetMapping("/profile")
    public ResponseEntity<FacultyProfileResponse> getProfile(@AuthenticationPrincipal UserDetails userDetails) {
        FacultyProfileResponse fr=profileService.getFacultyDetails(userDetails.getUsername());
        return ResponseEntity.ok(fr);
    }
    @GetMapping("/courses")
    public ResponseEntity<List<String>>getAllCourses(@AuthenticationPrincipal UserDetails userDetails){
        List<String> courses=courseRepository.findAllCourse();
        return ResponseEntity.ok(courses);
        
        


    }
    @GetMapping("/id")
    public String getMethodName(@AuthenticationPrincipal UserDetails userDetails) {
        System.out.println(userDetails.getUsername());
        return userDetails.getUsername();
        
        
    }
    
    
    
    
}
