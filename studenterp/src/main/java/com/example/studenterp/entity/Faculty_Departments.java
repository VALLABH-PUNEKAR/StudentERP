package com.example.studenterp.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;


@Entity
@Table(name="faculty_departments")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Faculty_Departments {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne
    @JoinColumn(name="faculty_id" )
    private FacultyInfo faculty;

    @ManyToOne
    @JoinColumn(name="department_id")
    @JsonBackReference
    private DepartmentInfo department;



    
    
}
