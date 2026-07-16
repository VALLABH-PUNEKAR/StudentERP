package com.example.studenterp.dto;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SaveStudent {
    private String id;
    private String email;
    private String role;
    private String password;
    private String batch;
    private String course;
    
    
}
