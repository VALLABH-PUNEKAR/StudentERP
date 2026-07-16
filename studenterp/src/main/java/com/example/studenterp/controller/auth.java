package com.example.studenterp.controller;

import com.example.studenterp.dto.LoginRequest;
import com.example.studenterp.dto.LoginResponse;
import com.example.studenterp.services.LoginService;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.AutoConfigureOrder;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")


public class auth {
     @Autowired
    private LoginService ls;
    
    @PostMapping("/login")
   
    public ResponseEntity<Map<String,String>> U_login(@RequestBody LoginRequest entity) {        
        LoginResponse lr;
        lr=ls.login(entity);
        if(lr.getMessage()!="User Does not exists" && lr.getMessage()!="Wrong Password")
        {
            Map<String,String> response=new HashMap<>();
            response.put("token",lr.getToken());
            response.put("role",lr.getRole());
            return ResponseEntity.ok(response);

        }
        else{
            return ResponseEntity.status(401).build();
        }
    }
    
    
}
