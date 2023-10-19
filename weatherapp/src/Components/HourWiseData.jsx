import React, { useContext, useEffect, useState } from 'react'
import { WeatherContext } from '../Context/WeatherContextProvider';
import axios from "axios"
import Chart from 'chart.js/auto';
import LineChart from './LineChart';
// import { Line } from 'react-chartjs-2';
   
    

    const HourWiseData = () => {


      const { state } = useContext(WeatherContext);
      const [hourlyData, setHourlyData] = useState([]);
    
      let lat = state.city && state.city.lat ? state.city.lat : '';
      let long = state.city && state.city.lng ? state.city.lng : '';
    
      const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&appid=f56f24967aaf51182d1d4df628297c6d`
    
      const fetchData = () => {
        axios(url).then((data) => {
          let hourly = data.data.hourly
          setHourlyData(hourly)
        })
      }
    
      useEffect(() => {
        fetchData();
      }, [state.city])
    
      const currentHour = new Date().getHours();
      const nextHoursData = hourlyData.slice(currentHour, currentHour + 24);
    
      const labels = nextHoursData.map((item, index) => {
        const date = new Date(item.dt * 1000);
       
        // const date = new Date(item.dt * 1000);
  const hours = date.getHours();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedHours = hours % 12 || 12; // Convert 0 to 12 for AM/PM format
  return `${formattedHours}:${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()} ${ampm}`;


        // return `${date.getHours()}:${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}`;
      });
      const temperatures = nextHoursData.map(item => item.temp);
    
      const chartData = {
        labels: labels,
        datasets: [
          {
            label: 'Temperature (°C)',
            data: temperatures,
            fill: false,
            borderColor: 'blue',
            tension: 0.1,
            pointRadius: 6
          },
        ],
      };
    
      const chartOptions = {
        // scales: {
        //   y: {
        //     beginAtZero: false,
        //   },
        // },
        scales: {
          x: {
            grid: {
              display: true,
              borderDash: [5], // This makes the grid lines vertical
            },
          },
          y: {
            beginAtZero: false,
          },
        },
      };
    
      return (
        <div style={{ width: '100%', overflowX: 'scroll' }}>
          <LineChart data={chartData} options={chartOptions} />
        </div>
      )
    }

export default HourWiseData