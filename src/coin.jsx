import { useEffect, useState } from 'react';
import './css/CoinDesk.css';
function CoinDesk({ search }) {
  const [coinDesk, setCoinDesk] = useState();

  useEffect(() => {
    fetch("https://data-api.coindesk.com/asset/v1/top/list?page=1&page_size=100&sort_by=CIRCULATING_MKT_CAP_USD&sort_direction=DESC&groups=ID,BASIC,SUPPLY,PRICE,MKT_CAP,VOLUME,CHANGE,TOPLIST_RANK&toplist_quote_asset=USD")
      .then(response => response.json())
      .then(jsonResponse => {
        setCoinDesk(jsonResponse);
        console.log(jsonResponse.Data.LIST)
      })
  }, []);

  function createCoinContainer() {
    if (!coinDesk) return <p>Loading list...</p>;
    return coinDesk.Data.LIST
      .filter((coin) =>
        coin.NAME.toLowerCase().includes(search.toLowerCase())
      )
      .map((coin, i) => (
        <div key={i} className='coin-container'>
          <div className='coin-name-logo-container'>
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

          <button className='favorite-button'></button>
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