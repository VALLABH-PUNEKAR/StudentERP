package com.example.studenterp.repository;

import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.studenterp.entity.CourseInfo;

public interface CourseRepository extends JpaRepository<CourseInfo,Integer>{
    @Query("SELECT c.course_name FROM CourseInfo c")
    List<String>findAllCourse();


    
}
