package com.example.studenterp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.studenterp.dto.Subjects;
import com.example.studenterp.repository.CourseSubjectRepository;

@RestController
@RequestMapping("/api/lms")
@CrossOrigin(origins="*")
public class LmsController {
    @Autowired
    private CourseSubjectRepository courseSubjectRepository;
    @GetMapping("/sem")
    public List<Integer> getAllSemester(@AuthenticationPrincipal UserDetails userDetails ,@RequestParam String course_name){
        return courseSubjectRepository.findDistinctSemestersByCourse_Name(course_name);
        
    }

    @GetMapping("/sem/sub")
    public List<Subjects> getSemesterSubject(@AuthenticationPrincipal UserDetails userDetails,@RequestParam String courseName,@RequestParam int semester){
        return courseSubjectRepository.findSubjectByCourseAndSemester(courseName,semester);
    }





    
}
