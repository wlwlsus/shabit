import React from 'react';
import styled from 'styled-components';
import { Routes, Route, Outlet } from 'react-router-dom';

import LandingSidebar from '../organisms/LandingSidebar';
import LandingContent from '../organisms/LandingContent';
import LandingForm from '../organisms/LandingForm';

import LandingIntroContent from '../organisms/LandingIntroContent';
import Social from '../molecules/Social';

import StartForm from '../organisms/StartForm';
import LoginForm from '../organisms/LoginForm';
import SignupForm from '../organisms/SignupForm';

const LandingTemplate = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />}>
        <Route
          path="/"
          element={
            <>
              <LandingContent children1={<LandingIntroContent />} />
              <LandingForm children={<StartForm />} />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <LandingContent children2={<Social />} />
              <LandingForm children={<LoginForm />} />
            </>
          }
        />
        <Route
          path="/signup"
          element={
            <>
              <LandingContent children2={<Social />} />
              <LandingForm children={<SignupForm />} />
            </>
          }
        />
      </Route>
    </Routes>
  );
};

const Landing = () => {
  return (
    <LandingWrapper>
      <LandingSidebar />
      <Outlet />
    </LandingWrapper>
  );
};

const LandingWrapper = styled.div`
  display: flex;
`;
export default LandingTemplate;
