package com.ezpz.shabit.user.service;

import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URLDecoder;
import java.nio.file.Path;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Objects;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.nio.file.Paths;

@Component
@Slf4j
@RequiredArgsConstructor
public class S3FileImpl implements S3File {

  private final AmazonS3Client amazonS3Client;

  @Value("${cloud.aws.s3.bucket}")
  private String bucket;

  final String dirName = "profile";

  // 이미지 업로드 method
  @Override
  public String upload(MultipartFile multipartFile, String dirName, String email) throws IOException {
    // 파일 업로드
    log.info("file : {}, dirName : {}", multipartFile, dirName);
    File uploadFile = convertToFile(multipartFile)
                              .orElseThrow(() -> new IllegalArgumentException("MultipartFile -> File로 변환에 실패했습니다."));
    // 파일명 중복을 피하기 위해 회원 정보 추가
    String fileName = dirName + "/" + email + " " + uploadFile.getName();
    log.info("created fileName : {}", fileName);

    // put - S3로 업로드
    String uploadImageUrl = putS3(uploadFile, fileName);
    // 로컬 파일 삭제
    removeFile(uploadFile);

    return uploadImageUrl;
  }

  // 이미지 삭제 method
  @Override
  public boolean delete(String profileUrl) {
    // S3에서 삭제
    log.info("profile url : {}", profileUrl);
    Pattern tokenPattern = Pattern.compile("(?<=profile/).*");
    Matcher matcher = tokenPattern.matcher(profileUrl);

    String temp = null;
    if (matcher.find()) {
      temp = matcher.group();
    }

    String originalName = URLDecoder.decode(temp);
    String filePath = dirName + "/" + originalName;
    log.info("originalName : {}", originalName);
    try {
      amazonS3Client.deleteObject(new DeleteObjectRequest(bucket, filePath));
      log.info("deletion complete : {}", filePath);
      return true;
    } catch (SdkClientException e) {
      log.info(e.getMessage());
      return false;
    }
  }

  // 로컬 파일 삭제
  private void removeFile(File targetFile) {
    if (targetFile.exists()) {
      if (targetFile.delete()) {
        log.info("파일이 삭제되었습니다.");
      } else {
        log.info("파일이 삭제되지 않았습니다.");
      }
    }
  }

  // S3로 파일 업로드 및 파일 url 리턴
  private String putS3(File uploadFile, String fileName) {
    amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, uploadFile)
                                     .withCannedAcl(CannedAccessControlList.PublicRead));
    return amazonS3Client.getUrl(bucket, fileName).toString();
  }

  // multipartFile -> File 형식으로 변환 및 로컬에 저장
  private Optional<File> convertToFile(MultipartFile file) throws IOException {
    File uploadFile = new File(Objects.requireNonNull(file.getOriginalFilename()));
    FileOutputStream fos = new FileOutputStream(uploadFile);
    fos.write(file.getBytes());
    fos.close();

    return Optional.of(uploadFile);
  }

}

