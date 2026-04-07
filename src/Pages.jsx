import { useEffect, useState } from 'react';
import CoinDesk, { PieChart } from './Content.jsx';
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const [search, setSearch] = useState("");
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

  return (
    <div className='container-row'>
        <div id='messageBox' className='message-box'>
          Favorited "Stellar hastagcoin longname Stellar hastagcoin longname"
        </div>

        <div className='container-column'>
          <input 
            className='search-bar' 
            type="text" 
            placeholder='Search top 100 coin...'
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
            <div className='graph-column-container'>
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
                    <div className='global-circle-graph'>
                      <h2>Top 3 coin growth</h2>
                        remember add some something here like 3 grow graphs for the top 3 coins or smh
                    </div>
                  </div>
                </div>
            </div>
     </div>
  );
}

export default HomePage;

function CoinPage() {
  const navigate = useNavigate();
  const { coinName } = useParams(); 
  const [coinDesk, setCoinDesk] = useState();
  
  useEffect(() => {
    fetch("https://data-api.coindesk.com/asset/v1/top/list?page=1&page_size=100&sort_by=CIRCULATING_MKT_CAP_USD&sort_direction=DESC&groups=ID,BASIC,SUPPLY,PRICE,MKT_CAP,VOLUME,CHANGE,TOPLIST_RANK&toplist_quote_asset=USD")
      .then(response => response.json())
      .then(jsonResponse => {
        const findCoin = jsonResponse.Data.LIST.find(
            (c) => c.NAME === coinName
          );
        setCoinDesk(findCoin);
      })
  }, [coinName]);

  function ReturnToHome() {
    navigate(`/`);
  }

  if(!coinDesk) return <p>Loading list...</p>;
    return(
      <div className='card-container' onClick={() => ReturnToHome()}>
        <div className='card'>
          <div className='test'>
            <h2>{coinDesk.NAME}</h2>
            <p>Total supply {coinDesk.SUPPLY_TOTAL}</p>
            <p>Price ${coinDesk.PRICE_USD}</p><br></br>
            <p>{coinDesk.ASSET_DESCRIPTION_SNIPPET}</p>
          </div>
        </div>
      </div>
    )
}

export { CoinPage };
