import { Buffer } from 'buffer';
import store from '../../store';
import {
  setUserState,
  setTokenState,
  setIsAdminState,
} from '../../store/authSlice';
import { useNavigate, useSearchParams } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

export default function Redirect() {
  const navigate = useNavigate();
  const [serchParams] = useSearchParams();
  const accessToken = serchParams.get('token');
  const error = serchParams.get('error');
  console.log(`token : ${accessToken}`);
  // console.log(`error : ${error}`);

  if (error) return;
  // JWT decode
  const base64Payload = accessToken.split('.')[1];
  const payload = Buffer.from(base64Payload, 'base64');
  const result = JSON.parse(payload.toString());
  console.log(result.sub);

  // const {sub:result.sub, auth:result.auth, exp:result.exp} = result
  // sessionStorage.setItem('user', JSON.stringify(user));
  // sessionStorage.setItem('accessToken', JSON.stringify(accessToken));
  // console.log(result.sub);
  // navigate('/main');
}
