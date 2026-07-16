package com.example.studenterp.dto;

import lombok.Data;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentProfileResponse {
    private String name;
    private String gender;
    private String mobile;
    private LocalDate dob;
    private String pob;
    private String roll_no;
    private String blood_grp;
    private String occupation;
    private String aadhar_no;
    private String pan_card_no;
    private String nationality; 
    private String course;
    private String institute;
}
