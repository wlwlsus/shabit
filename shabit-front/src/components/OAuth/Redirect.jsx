import { Buffer } from 'buffer';
import { useEffect } from 'react';
import store from '../../store';
import {
  setUserState,
  setTokenState,
  setIsAdminState,
} from '../../store/authSlice';
import Auth from '../../services/auth';
import { useNavigate, useSearchParams } from 'react-router-dom';
// import jwt_decode from 'jwt-decode';

export default function Redirect() {
  const navigate = useNavigate();
  const [serchParams] = useSearchParams();
  const accessToken = serchParams.get('token');
  const error = serchParams.get('error');

  if (error) return;
  // JWT decode
  const base64Payload = accessToken.split('.')[1];
  const payload = Buffer.from(base64Payload, 'base64');
  const result = JSON.parse(payload.toString());

  sessionStorage.setItem('accessToken', JSON.stringify(accessToken));

  Auth.fetchProfile(result.sub)
    .then((res) => {
      const user = res;
      sessionStorage.setItem('user', JSON.stringify(user));
      store.dispatch(setUserState(user));
      store.dispatch(setTokenState(accessToken));
      store.dispatch(setIsAdminState(result.auth === 'ROLE_ADMIN'));
      navigate('/main');
    })
    .catch((err) => {
      console.log(err);
    });
}
