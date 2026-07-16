package com.example.studenterp.services;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.studenterp.dto.FacultyProfileRequest;
import com.example.studenterp.dto.FacultyProfileResponse;
import com.example.studenterp.dto.StudentName;
import com.example.studenterp.dto.StudentProfileResponse;
import com.example.studenterp.entity.FacultyInfo;
import com.example.studenterp.entity.StudentInfo;
import com.example.studenterp.exceptions.FacultyNotFound;
import com.example.studenterp.exceptions.StudentNotFound;
import com.example.studenterp.repository.FacultyRepository;
import com.example.studenterp.repository.NameRepository;
import com.example.studenterp.repository.StudentRepository;
import com.example.studenterp.repository.UserRepository;
import com.example.studenterp.entity.User;
import com.example.studenterp.entity.Faculty_Departments;

@Service
public class ProfileService {
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private NameRepository nameRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private FacultyRepository facultyRepository;

    public StudentProfileResponse getStudentByRollNo(String roll_no){
        StudentInfo s_info= studentRepository.findByUserId(roll_no).orElseThrow(()->new StudentNotFound("Profile Incomplete"));
        String course_name=s_info.getCourse().getCourse_name();
        return new StudentProfileResponse(
            s_info.getName(),
            s_info.getGender(),
            s_info.getMobile(),
            s_info.getDob(),
            s_info.getPob(),
            s_info.getUser()!=null ? s_info.getUser().getId() :null,
            s_info.getBlood_grp(),
            s_info.getOccupation(),
            s_info.getAadhar_no(),
            s_info.getPan_card_no(),
            s_info.getNationality(),
            course_name,
            s_info.getInstitute()
            
        );
    }
    public String getStudentName(String roll_no){
        Optional<StudentName> name=nameRepository.findNameByUserId(roll_no);
        return name.map(StudentName::getName).orElse("Profile Incomplete");
    }

    public String getCourse(String roll_no){
        
        return studentRepository.findCourseNameByRollNo(roll_no).orElse("Error Occured");
    }

    public void saveOrupdateStudent(String roll_no,StudentProfileResponse data){
       
        User user=userRepository.findById(roll_no).orElseThrow(()->new RuntimeException("User Not found"));



        StudentInfo info=studentRepository.findByUserId(roll_no).orElse(new StudentInfo());

       

        info.setUser(user);
        info.setName(data.getName());
        info.setGender(data.getGender());
        info.setMobile(data.getMobile());
        info.setDob(data.getDob());
        info.setPob(data.getPob());
        info.setBlood_grp(data.getBlood_grp());
        info.setOccupation(data.getOccupation());
        info.setAadhar_no(data.getAadhar_no());
        info.setPan_card_no(data.getPan_card_no());
        info.setNationality(data.getNationality());
        info.setInstitute(data.getInstitute());

        studentRepository.save(info);
        

    }


    public void saveOrupdateFaculty(String emp_id,FacultyProfileRequest data){
        User user=userRepository.findById(emp_id).orElseThrow(()->new RuntimeException("User Not found"));

        FacultyInfo info=facultyRepository.findByUserId(emp_id).orElse(new FacultyInfo());

        info.setUser(user);
        info.setBio(data.getBio());
        info.setName(data.getName());
        info.setGender(data.getGender());
        info.setMobile(data.getMobile());
        info.setDob(data.getDob());
        info.setAadhar_no(data.getAadhar_no());
        info.setOffice_address(data.getOffice_address());
        info.setDesignation(data.getDesignation());
        info.setQualification(data.getQualification());
        info.setSpecialization(data.getSpecialization());
        

        facultyRepository.save(info);
    }
    public FacultyProfileResponse getFacultyDetails(String emp_id){
        FacultyInfo f_info=facultyRepository.findByUserId(emp_id).orElseThrow(()->new FacultyNotFound("Profile Incomplete"));
        int id=f_info.getId();
        List<String> dept_codes=facultyRepository.findDeptCodeById(id);
        return new FacultyProfileResponse(
            f_info.getName(),
            f_info.getGender(),
            f_info.getMobile(),
            f_info.getDob(),
            emp_id,
            f_info.getAadhar_no(),
            f_info.getOffice_address(),
            f_info.getDesignation(),
            dept_codes,
            f_info.getQualification(),
            f_info.getSpecialization(),
             f_info.getBio(),
            f_info.getInstitute()



        );

        
    }
    
    
}
