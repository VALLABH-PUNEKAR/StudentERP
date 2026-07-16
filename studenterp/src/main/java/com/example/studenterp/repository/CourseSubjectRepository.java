package com.example.studenterp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.studenterp.dto.Subjects;
import com.example.studenterp.entity.Course_Subjects;

@Repository
public interface CourseSubjectRepository extends JpaRepository<Course_Subjects,Integer>{
    @Query("SELECT DISTINCT cs.semester FROM Course_Subjects cs " +
           "WHERE LOWER(cs.course.course_name) = LOWER(:course_name) " +
           "ORDER BY cs.semester ASC")
        List<Integer> findDistinctSemestersByCourse_Name(@Param("course_name") String course_name);

    @Query("SELECT new com.example.studenterp.dto.Subjects(s.subject_id,s.subject_name,s.credits) "+" FROM Course_Subjects cs " + " JOIN cs.subjects s " + " WHERE cs.course.course_name=:courseName AND cs.semester=:semester ORDER BY s.subject_name ASC")
    List<Subjects> findSubjectByCourseAndSemester(@Param("courseName") String courseName,@Param("semester") int semester);
    

    

    
}
