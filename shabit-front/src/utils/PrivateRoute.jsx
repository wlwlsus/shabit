import React from 'react';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ authenticated, component }) {
  return authenticated ? (
    component
  ) : (
    <Navigate to="/login" {...alert('로그인이 필요한 서비스입니다.')} />
  );
}
