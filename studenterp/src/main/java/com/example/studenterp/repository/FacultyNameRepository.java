package com.example.studenterp.repository;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.studenterp.dto.FacultyName;
import com.example.studenterp.entity.FacultyInfo;

@Repository
public interface FacultyNameRepository extends JpaRepository<FacultyInfo,Integer>{
    Optional<FacultyName> findNameByUserId(String emp_id);
    
}
