package com.example.studenterp.exceptions;

public class StudentNotFound extends RuntimeException{
    public StudentNotFound(String message){
        super(message);
    }
    
}
