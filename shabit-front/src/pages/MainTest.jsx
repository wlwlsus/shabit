import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileForm from '../components/authTest/ProfileForm';
import HeatMap from '../components/UiTest/HeatMap';

const MainTest = () => {
  const navigate = useNavigate();

  return (
    <div>
      <ProfileForm />
      <HeatMap />
    </div>
  );
};

export default MainTest;
