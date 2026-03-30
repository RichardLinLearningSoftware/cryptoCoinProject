import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import { BrowserRouter } from 'react-router';
import HomePage, { CoinPage } from './Pages.jsx';
import './css/App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/coin/coinId" element={<CoinPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
