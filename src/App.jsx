import { useEffect, useState } from 'react';
import CoinDesk from './coin.jsx';
import PieChart from './graph.jsx';
import { Route, Routes } from 'react-router';
import './css/App.css';

function App() {
  useEffect(() => {
    const containers = document.querySelectorAll(".card-container");
    const cards = document.querySelectorAll(".card");
    if (!containers.length || !cards.length) return;
    const handlers = [];
    containers.forEach((container, i) => {
      const mouseMoveHandler = (e) => {
        const rect = container.getBoundingClientRect();
        const innerX = e.clientX - rect.left;
        const innerY = e.clientY - rect.top;
        const x = cards[i].offsetWidth / 2;
        const y = cards[i].offsetHeight / 2;
        const intensityX = 3;
        const intensityY = 3;
        let convertX = ((innerX - x) * intensityX) / x;
        let convertY = ((innerY - y) * intensityY) / y;
        cards[i].style.transform = `rotateY(${convertX}deg) rotateX(${-convertY}deg)`;
      };
      const mouseOutHandler = () => {
        cards[i].style.transform = "rotateY(0deg) rotateX(0deg)";
      };
      container.addEventListener("mousemove", mouseMoveHandler);
      container.addEventListener("mouseout", mouseOutHandler);
      handlers.push({ container, mouseMoveHandler, mouseOutHandler });
    });
    return () => {
      handlers.forEach(({ container, mouseMoveHandler, mouseOutHandler }) => {
        container.removeEventListener("mousemove", mouseMoveHandler);
        container.removeEventListener("mouseout", mouseOutHandler);
      });
    };
  }, []);
   const [search, setSearch] = useState("");

  return (
    <>
     <div className='container-row'>
        <div className='container-column'>
          <input 
            className='search-bar' 
            type="text" 
            placeholder='Search coin...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className='card-container'>
            <div className='card'>
              <div className='coin-desk-window'>
                <CoinDesk search={search}/>
              </div>
            </div>
          </div>
        </div>

        <div className='crypto-row-container'>
          <div className='crypto-column-cotainer'>
            <div className='card-container'>
              <div className='card'>
                <div className='global-circle-graph'>
                  <h2>Top 10 crypto coins</h2>
                  <div className='pie-chart-container'>
                    <PieChart/>
                  </div>
                </div>
              </div>
            </div>
            <div className='card-container'>
              <div className='card'>
                <div className='crypto-profile-container'>
                  wow
                </div>
              </div>
            </div>
          </div>
          <div className='description-container'>
          </div>
        </div>
     </div>
    </>
  );
}

export default App;
