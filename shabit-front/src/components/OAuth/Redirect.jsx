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
import { FireAlert } from '../../services';
// import jwt_decode from 'jwt-decode';

export default function Redirect() {
  const navigate = useNavigate();
  const [serchParams] = useSearchParams();
  const accessToken = serchParams.get('accessToken');
  const refreshToken = serchParams.get('refreshToken');
  const error = serchParams.get('error');

  const ASUS = 'already_signed_up_social';
  const ASUL = 'already_signed_up_local';

  useEffect(() => {
    switch (error) {
      case ASUS:
        FireAlert(
          '다른 소셜에서 가입된 이메일 입니다. 해당 소셜 로그인을 이용해 주세요.',
        );
        break;
      case ASUL:
        FireAlert('기존 회원입니다. 자체 로그인을 이용해 주세요.');
        break;

      default:
        break;
    }
    if (error) {
      navigate('/login');
      return;
    }
    // JWT decode
    const base64Payload = accessToken.split('.')[1];
    const payload = Buffer.from(base64Payload, 'base64');
    const result = JSON.parse(payload.toString());

    sessionStorage.setItem('accessToken', JSON.stringify(accessToken));
    sessionStorage.setItem('refreshToken', JSON.stringify(refreshToken));

    Auth.fetchProfile(result.sub)
      .then((res) => {
        console.log('Get User Info');
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
  });
}
