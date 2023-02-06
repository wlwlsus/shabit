import { useEffect } from 'react';
import { Buffer } from 'buffer';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function Redirect() {
  const navigate = useNavigate();
  const [serchParams] = useSearchParams();
  const token = serchParams.get('token');
  const error = serchParams.get('error');
  console.log(`token : ${token}`);
  console.log(`error : ${error}`);

  if (!error) {
    // JWT decode
    const base64Payload = token.split('.')[1];
    const payload = Buffer.from(base64Payload, 'base64');
    const result = JSON.parse(payload.toString());
    console.log(result);
    console.log(result.sub);
    navigate('/main');
  }
}
