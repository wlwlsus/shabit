import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MoveToAdmin from '../components/Admin/MoveToAdmin';
import LogoutButton from '../components/Main/LogoutButton';

const AdminPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <PageWrapper>
      <ContainerWrapper>
        <Tab
          onClick={() => {
            navigate('/admin');
          }}
          className={currentPath === '/admin' ? 'selected' : ''}
        >
          영상
        </Tab>
        <Tab
          onClick={() => {
            navigate('/admin/settings');
          }}
          className={currentPath === '/admin/settings' ? 'selected' : ''}
        >
          시간/문구
        </Tab>
        <Container>
          <Wrapper>
            <MoveToAdmin />
            <LogoutButton></LogoutButton>
            <Outlet />
          </Wrapper>
        </Container>
      </ContainerWrapper>
    </PageWrapper>
  );
};

export default AdminPage;

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: default;
  }
`;
const ContainerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  & > button:first-child {
    position: absolute;
    top: -8%;
    left: 0;
  }

  & > button:nth-child(2) {
    position: absolute;
    top: -8%;
    /* left: 11.5%; */
    left: 8.1rem;
  }

  & > div:last-child {
  }
`;

const Container = styled.div`
  width: 70rem;
  height: 36rem;
  background-color: ${(props) => props.theme.color.whiteColor};
  border-radius: 0 1.5rem 1.5rem;
  padding: 2rem;
  box-shadow: 0 0.2rem 0.5rem ${(props) => props.theme.color.grayColor};
  z-index: 0;
`;

const Tab = styled.button`
  background-color: ${(props) => props.theme.color.whiteColor};
  color: ${(props) => props.theme.color.grayColor};
  font-size: 1.1rem;
  width: 8rem;
  font-weight: bold;
  line-height: 0.7rem;
  padding: 1.2rem;
  border-radius: 1.5rem 1.5rem 0 0;
  box-shadow: 0 0.2rem 0.5rem ${(props) => props.theme.color.lightGrayColor};
  .selected {
    background-color: ${(props) => props.theme.color.primary};
    color: ${(props) => props.theme.color.secondary};
  }
`;

const Wrapper = styled.div``;
