package com.example.studenterp.services;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.PresignedPutObjectRequest;
import software.amazon.awssdk.services.s3.presigner.model.PutObjectPresignRequest;

import java.util.UUID;
import java.net.URI;
import java.time.Duration;
import java.util.HashMap;
import java.util.Map;

@Service
public class AssignmentService {

    @Value("${supabase.s3.endpoint}")
    private String endpoint;

    @Value("${supabase.s3.access-key}")
    private String accessKey;

    @Value("${supabase.s3.secret-key}")
    private String secretKey;

    @Value("${supabase.s3.region}")
    private String region;

    @Value("${supabase.s3.bucket-name}")
    private String bucketName;
    public Map<String,String> getUploadInstructions(String fileName){
        String uniqueName=UUID.randomUUID()+"_"+fileName;
         Map<String,String> responseMap=new HashMap<>();
        try{
            S3Presigner presigner=S3Presigner.builder().endpointOverride(URI.create(endpoint))
            .credentialsProvider(StaticCredentialsProvider.create(AwsBasicCredentials.create(accessKey,secretKey)))
            .region(Region.of(region))
            .build();

            PutObjectPresignRequest presignRequest=PutObjectPresignRequest.builder()
            .signatureDuration(Duration.ofMinutes(10))
            .putObjectRequest(por->por.bucket(bucketName).key(uniqueName)).build();

            PresignedPutObjectRequest presignedPutObjectRequest=presigner.presignPutObject(presignRequest);
            String url=presignedPutObjectRequest.url().toString();
            
            String finalUrl=endpoint.replace("/s3", "/object/public/"+bucketName+"/"+uniqueName);
            
            responseMap.put("uploadUrl",url);
            responseMap.put("downloadUrl",finalUrl); 
            

        }
        catch(Exception e){
            System.out.println("Error "+e);
        }
        return responseMap;
        
    }

    





    

    
}
