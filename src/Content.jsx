import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import './css/CoinDesk.css';
import { useNavigate } from "react-router-dom";

function CoinDesk({ search }) {
  const [coinDesk, setCoinDesk] = useState();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);

  function toggleFavorite(coinName) {
    setFavorites((targetCoin) => {
      if (targetCoin.includes(coinName)) {
        alert("Unfavorited " + coinName);
        return targetCoin.filter(name => name !== coinName);
      } else {
        alert("Favorited " + coinName);
        return [...targetCoin, coinName];
      }
    });
  }

  useEffect(() => {
    fetch("https://data-api.coindesk.com/asset/v1/top/list?page=1&page_size=100&sort_by=CIRCULATING_MKT_CAP_USD&sort_direction=DESC&groups=ID,BASIC,SUPPLY,PRICE,MKT_CAP,VOLUME,CHANGE,TOPLIST_RANK&toplist_quote_asset=USD")
    .then(response => response.json())
    .then(jsonResponse => {
      setCoinDesk(jsonResponse);
    })

    const savedFavorites = JSON.parse(localStorage.getItem("favorites"));
    if (savedFavorites) {
      setFavorites(savedFavorites);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  function ClickCoin(coin) {
    navigate(`/${coin.NAME}`);
  }

  function createCoinContainer() {
    if (!coinDesk) return <p>Loading list...</p>;
    return coinDesk.Data.LIST
      .filter((coin) =>
        coin.NAME.toLowerCase().includes(search.toLowerCase())
      )
      .sort((x, y) => {
        const xFav = favorites.includes(x.NAME);
        const yFav = favorites.includes(y.NAME);

        if (yFav === xFav) return 0;     // keep original order
        if (xFav) return -1;             // a comes first
        return 1;                        // b comes first
      })
      .map((coin, i) => (
        <div key={i} className='coin-container'>          
          <div className='coin-name-logo-container' onClick={() => ClickCoin(coin)} >
            <img src={coin.LOGO_URL} alt={coin.NAME}/>
            
            <div className='coin-container-column-container'>
              <h2>{coin.NAME}</h2>

              <div className='coin-value-growth-row-container'>
                <p>{Math.round(coin.PRICE_USD * 100) / 100}</p>
                
                <div className={`coin-growth ${coin.SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_CONVERSION >= 0 ? 'positive-growth' : 'negative-growth'}`}>
                  {Math.round(coin.SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_CONVERSION * 100) / 100}%
                </div>
              </div>
            </div>

          </div>

          <button
            onClick={() => toggleFavorite(coin.NAME)}
            className={favorites.includes(coin.NAME) ? "favorite-button" : "unfavorite-button"}>
          </button>
        </div>
      ));
  }

  return (
    <div className='coin-box'>
      {createCoinContainer()}
    </div>
  );
}
export default CoinDesk

ChartJS.register(ArcElement, Tooltip, Legend);
function PieChart() {
    const [coinDesk, setCoinDesk] = useState();

    useEffect(() => {
        fetch("https://data-api.coindesk.com/asset/v1/top/list?page=1&page_size=100&sort_by=CIRCULATING_MKT_CAP_USD&sort_direction=DESC&groups=ID,BASIC,SUPPLY,PRICE,MKT_CAP,VOLUME,CHANGE,TOPLIST_RANK&toplist_quote_asset=USD")
        .then(response => response.json())
        .then(jsonResponse => {
            setCoinDesk(jsonResponse);
        })
    }, []);
  
    if (!coinDesk) return <p>Loading chart...</p>;

    const top10 = coinDesk.Data.LIST.slice(0, 10);

    const data = {
        labels: top10.map(coin => coin.NAME),
        datasets: [
            {
            label: 'Market Cap (USD)',
            data: top10.map(coin => coin.CIRCULATING_MKT_CAP_USD),
            backgroundColor: [
                '#FFD93D', '#78D0FF', '#FF543D',
                '#3E7C6D', '#8DE7D2', '#9191FE',
                '#C4BAE2', '#FFFFFF', '#FC6C74', '#FFA778'
            ],
            borderWidth: 0,
            hoverOffset: 3
            }
        ]
        };
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'right',
                align: 'start',
                maxWidth: 500,
                labels: {
                    boxWidth: 20,
                    boxHeight: 20,
                    color: '#dcddf8'
                }
            },
            tooltip: {
                enabled: true,           // show tooltips
                backgroundColor: '#505069', // tooltip background
                titleColor: 'white',      // title (usually the label)
                bodyColor: '#ddd',       // value text
                borderColor: '#555',
                padding: 10,             // inner padding
                cornerRadius: 8           // rounded corners
            }
        }
    };
    

    return <Pie data={data} options={options}/>;
}

export {PieChart}