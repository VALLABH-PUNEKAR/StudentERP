package com.example.studenterp.entity;
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
@Table(name="courses_subjects")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Course_Subjects {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne
    @JoinColumn(name="course_id")
    private CourseInfo course;

    @ManyToOne
    @JoinColumn(name="subject_id")
    private SubjectInfo subjects;

    private int semester;

    
}
