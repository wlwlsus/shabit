import React from 'react';
import { Routes, Route } from 'react-router-dom';

export default function MainPage() {
  return (
    <Routes>
      <Route path="/main" element={<div>this is main</div>} />
    </Routes>
  );
}
