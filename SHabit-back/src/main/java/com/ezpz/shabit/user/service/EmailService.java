package com.ezpz.shabit.user.service;

public interface EmailService {
  String sendFindPasswordEmail(String email) throws Exception;

  String sendCertificationEmail(String email) throws Exception;
}
