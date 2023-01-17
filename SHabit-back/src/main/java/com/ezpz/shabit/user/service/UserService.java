package com.ezpz.shabit.user.service;

public interface UserService {

  void updatePassword(String email, String password) throws Exception;
}
