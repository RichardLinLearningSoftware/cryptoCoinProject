import { useEffect, useState } from 'react';
import './css/CoinDesk.css';
function CoinDesk() {
  const [coinDesk, setCoinDesk] = useState();
  useEffect(() => {
    fetch("https://data-api.coindesk.com/asset/v1/top/list?page=1&page_size=100&sort_by=CIRCULATING_MKT_CAP_USD&sort_direction=DESC&groups=ID,BASIC,SUPPLY,PRICE,MKT_CAP,VOLUME,CHANGE,TOPLIST_RANK&toplist_quote_asset=USD")
      .then(response => response.json())
      .then(jsonResponse => {
        setCoinDesk(jsonResponse);
        console.log(jsonResponse.Data.LIST[0])
      })
  },[]);

function createCoinContainer() {
    if(coinDesk){
        const elements = [];
        for (let i = 0; i < coinDesk.Data.LIST.length; i++) {
        elements.push(
            <div key={i} className='coin-container'>
                <div className='coin-name-logo-container'>
                    <img src={coinDesk.Data.LIST[i].LOGO_URL}/>
                    <h2>{coinDesk.Data.LIST[i].NAME}</h2>
                </div>

                <p>{Math.round(coinDesk.Data.LIST[i].PRICE_USD * 100) / 100}</p>
            </div>
        );
        }
        return elements;
    }
}

  return (
    <>
      <div className='coin-box'>
        {createCoinContainer()}
      </div>
    </>
  );
}

export default CoinDesk