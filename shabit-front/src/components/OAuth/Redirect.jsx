import { useNavigate, useSearchParams } from 'react-router-dom';

export default function Redirect() {
  const navigate = useNavigate();
  const [serchParams] = useSearchParams();
  console.log(`token : ${serchParams.get('token')}`);
  console.log(`error : ${serchParams.get('error')}`);
  navigate('/main');
}
