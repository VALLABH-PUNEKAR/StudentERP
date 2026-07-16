package com.example.studenterp.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.studenterp.entity.FacultyInfo;

public interface FacultyRepository extends JpaRepository<FacultyInfo,Integer>{
    Optional<FacultyInfo> findByUserId(String emp_id);

    @Query("SELECT fd.department.dept_code FROM Faculty_Departments fd WHERE fd.faculty.id = :id")
    List<String> findDeptCodeById(@Param("id") int id);
    

    
}
