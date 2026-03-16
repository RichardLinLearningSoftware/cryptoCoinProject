import { useEffect, useState } from 'react';
import CoinDesk from './coin.jsx';
import { Route, Routes } from 'react-router';
import './css/App.css';

function App() {
  
  return (
    <>
      <div className='coin-desk-window'>
        <Routes>
          <Route path="/" element={<CoinDesk/>}/>
        </Routes>
      </div>
    </>
  );
}

export default App
