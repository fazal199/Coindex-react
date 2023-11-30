import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as Chartjs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

Chartjs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const Chart = ({arr,currency,days}) => {

    
    let date = [];
    let prices = [];

    for(let i=0; i<arr.length; i++)
    {
        if(days === "24h") date.push(new Date(arr[i][0]).toLocaleTimeString());
        
        else
        date.push(new Date(arr[i][0]).toLocaleDateString());

        prices.push(arr[i][1]);   
    }

    console.log(date);
    console.log(prices);
    
    

    const chartdata = {
            labels : date,
            datasets : [
                {
                    label : `Price in ${currency}`,
                    data : prices,
                    borderColor : 'red',
                    backgroundColor : 'rgb(259,99,132,0.5)'
                }
            ]
    }
    
  
  return <Line options={{responsive : true}} data={chartdata}/>;
};

export default Chart;
