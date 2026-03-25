import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart() {
    const [coinDesk, setCoinDesk] = useState();

    useEffect(() => {
        fetch("https://data-api.coindesk.com/asset/v1/top/list?page=1&page_size=100&sort_by=CIRCULATING_MKT_CAP_USD&sort_direction=DESC&groups=ID,BASIC,SUPPLY,PRICE,MKT_CAP,VOLUME,CHANGE,TOPLIST_RANK&toplist_quote_asset=USD")
        .then(response => response.json())
        .then(jsonResponse => {
            setCoinDesk(jsonResponse);
            console.log(jsonResponse.Data.LIST)
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
                    boxWidth: 10,
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

export default PieChart