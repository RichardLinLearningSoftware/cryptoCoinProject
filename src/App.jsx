import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router';
import HomePage from './Homepage.jsx';
import './css/App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
