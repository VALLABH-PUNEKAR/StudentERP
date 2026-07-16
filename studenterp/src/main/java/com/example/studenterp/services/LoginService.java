package com.example.studenterp.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.studenterp.entity.User;
import com.example.studenterp.dto.LoginRequest;
import com.example.studenterp.dto.LoginResponse;
import com.example.studenterp.repository.UserRepository;
import com.example.studenterp.security.JwtService;
@Service
public class LoginService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private JwtService jwtService;
    
    public LoginResponse login(LoginRequest request){
        LoginResponse loginResponse=new LoginResponse();
        String token="";
        
        if(request.getId()!=""&&request.getId()!=null){
            Optional<User> findOptional=userRepository.findById(request.getId());
            if(findOptional.isEmpty()){
                //System.out.println("User Does not exists");
                loginResponse.setMessage("User Does not exists");
                return loginResponse;
                
            }
            User u=findOptional.get();
            if(!u.getPassword().equals(request.getPassword())){
                //System.out.println("Wrong Password");
                loginResponse.setMessage("Wrong Password");
                return loginResponse;
            }
            token=jwtService.generateToken(u.getId(), "ROLE_"+u.getRole());
            loginResponse.setToken(token);
             loginResponse.setRole(u.getRole());
        } 
        if(request.getEmail()!=""&&request.getEmail()!=null){
            
            Optional<User> findOptional=userRepository.findByEmail(request.getEmail());
            if(findOptional.isEmpty()){
                //System.out.println("User Does not exists");
                loginResponse.setMessage("User Does not exists");
                return loginResponse;
            }
            User u=findOptional.get();
            if(!u.getPassword().equals(request.getPassword())){
                //System.out.println("Wrong Password");
                loginResponse.setMessage("Wrong Password");
                return loginResponse;
            }
            token=jwtService.generateToken(u.getId(), u.getRole());
             loginResponse.setToken(token);
             loginResponse.setRole(u.getRole());

           
        }
        //System.out.println(result);
       
        return loginResponse;
    }
    
}
