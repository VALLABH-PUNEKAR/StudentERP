package com.example.studenterp.entity;

//import java.sql.Date; Old legacy code
import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;


@Entity
@Table(name="Students")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentInfo {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)//handle mysql auto-increment
    private int id;
    private String name;
    private String gender;
    private String mobile;
    private LocalDate dob;
    private String pob;
    private String blood_grp;
    private String occupation;
    private String aadhar_no;
    private String pan_card_no;
    private String nationality;
    
    private String institute;

    //For connecting two tables
    @ManyToOne
    @JoinColumn(name="roll_no",referencedColumnName="id")
    private User user;

    @ManyToOne
    @JoinColumn(name="course_id",referencedColumnName = "course_id")
    private CourseInfo course;

    
}
