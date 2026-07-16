package com.example.studenterp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.studenterp.entity.StudentInfo;

public interface StudentRepository extends JpaRepository<StudentInfo,Integer>{//second parameter is primary key datatype
    Optional<StudentInfo> findByUserId(String roll_no);
    
    @Query("SELECT s.course.course_name FROM StudentInfo s WHERE s.user.id = :roll_no")
    Optional<String> findCourseNameByRollNo(@Param("roll_no") String roll_no);


    
}
