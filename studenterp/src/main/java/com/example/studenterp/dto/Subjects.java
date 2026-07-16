package com.example.studenterp.dto;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Subjects {
    private int subject_id;
    private String subject_name;
    private int credits;
    
}
