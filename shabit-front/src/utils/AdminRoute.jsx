import React from 'react';
import { Navigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

export default function AdminRoute({ component }) {
  const token = sessionStorage.getItem('accessToken');
  const isLogin = !!token;
  let result;
  if (isLogin) {
    if (jwt_decode(token).auth === 'ROLE_ADMIN') {
      result = component;
    } else {
      result = <Navigate to="/main" {...alert('관리자만 접근 가능합니다')} />;
    }
  } else {
    result = (
      <Navigate to="/login" {...alert('로그인이 필요한 서비스입니다.')} />
    );
  }
  return result;
}
