import Reacte from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { logout } from '../../services/auth/post';
import { clearAuthState } from '../../store/authSlice';

const LogoutButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Button
      onClick={() => {
        logout().then(() => {
          navigate('/');
          dispatch(clearAuthState);
        });
      }}
    >
      로그아웃
    </Button>
  );
};

export default LogoutButton;
const Button = styled.button`
  z-index: 2;
  margin-top: 0.5rem;
  background-color: ${(props) => props.theme.color.primary};
  color: ${(props) => props.theme.color.whiteColor};
  padding: 0.5rem;
  border-radius: 0.5rem;
  font-weight: bold;
  box-shadow: 0 0.1rem 0.5rem ${(props) => props.theme.color.lightGrayColor};

  position: absolute;
  top: 0.5rem;
  right: 1rem;
`;
