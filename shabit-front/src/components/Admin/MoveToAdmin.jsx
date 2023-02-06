import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { typedUseSelector } from '../../store';
import { theme } from '../../styles/GlobalStyles';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { setIsAdminState } from '../../store/authSlice';

const MoveToAdmin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDiaplay, setIsDisplay] = useState(false);
  const [pathName, setPathName] = useState('');
  const isAdmin = typedUseSelector((state) => {
    return state.auth.isAdmin;
  });
  const token = sessionStorage.getItem('accessToken');
  const decodedAuth = token && jwt_decode(token).auth;

  useEffect(() => {
    setPathName(location.pathname);
  }, [location]);
  useEffect(() => {
    if (!decodedAuth) return navigate('/main');
    if (decodedAuth !== 'ROLE_ADMIN' && isAdmin === false) navigate('/main');
    else dispatch(setIsAdminState(true));
  }, [isAdmin, decodedAuth]);

  return (
    <ButtonContainer>
      <div style={{ visibility: `${isAdmin ? 'visible' : 'hidden'}` }}>
        {pathName === '/admin' ? (
          <StyledButton onClick={() => navigate('/main')}>
            메인 페이지로 돌아가기
          </StyledButton>
        ) : (
          <StyledButton onClick={() => navigate('/admin')}>
            관리자 페이지로 이동하기
          </StyledButton>
        )}
      </div>
    </ButtonContainer>
  );
};

export default MoveToAdmin;

const StyledButton = styled.button`
  margin-top: 0.5rem;
  background-color: ${theme.color.blueColor};
  color: ${theme.color.whiteColor};
  padding: 0.5rem;
  border-radius: 0.5rem;
  font-weight: bold;
  box-shadow: 0 0.1rem 0.5rem ${theme.color.lightGrayColor};
`;
const ButtonContainer = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 6.5rem;
`;
