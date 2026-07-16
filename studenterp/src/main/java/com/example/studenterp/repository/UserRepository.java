package com.example.studenterp.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.studenterp.entity.User;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User,String>{
    Optional<User> findById(String id);
    Optional<User> findByEmail(String email);

    


    
}
