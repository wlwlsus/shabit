package com.ezpz.shabit.user.controller;

import com.ezpz.shabit.user.service.S3FileService;
import com.ezpz.shabit.user.service.UserService;
import com.ezpz.shabit.util.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/v1/user/")
@Slf4j
@RequiredArgsConstructor
public class UserController {

}
