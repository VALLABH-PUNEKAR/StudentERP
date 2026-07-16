package com.example.studenterp.entity;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@Table(name="Faculty")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class FacultyInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;
    private String gender;
    private String mobile;
    private LocalDate dob;
    private String aadhar_no;
    private String office_address;
    private String designation;
    
    private String qualification;
    private String specialization;
    private String bio;
    private String institute;

    @ManyToOne
    @JoinColumn(name="emp_id",referencedColumnName="id")
    private User user;

    
    
}
