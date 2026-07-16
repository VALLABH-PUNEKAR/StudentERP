package com.example.studenterp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.studenterp.dto.StudentName;
import com.example.studenterp.entity.StudentInfo;
@Repository
public interface NameRepository extends JpaRepository<StudentInfo,Integer>{
    Optional<StudentName> findNameByUserId(String roll_no);

    
}
