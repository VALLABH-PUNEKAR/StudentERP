package com.example.studenterp.dto;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;


@Data

@AllArgsConstructor
@NoArgsConstructor
public class FacultyProfileResponse {
   
    private String name;
    private String gender;
    private String mobile;
    private LocalDate dob;
     private String emp_id;
    private String aadhar_no;
    private String office_address;
    private String designation;
    private List<String> department;
    private String qualification;
    private String specialization;
    private String bio;
    private String institute;
    
}
