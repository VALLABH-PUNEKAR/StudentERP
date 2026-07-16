package com.example.studenterp.dto;
import lombok.Data;

import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class FacultyProfileRequest {
    private String name;
    private String gender;
    private String mobile;
    private LocalDate dob;
    private String emp_id;
    private String aadhar_no;
    private String office_address;
    private String designation;
    
    private String qualification;
    private String specialization;
    private String bio;
    
    
}
