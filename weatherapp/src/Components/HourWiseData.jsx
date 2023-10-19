import React, { useContext } from 'react'
import { Line } from 'react-chartjs-2';
import { WeatherContext } from '../Context/WeatherContextProvider';

const HourWiseData = ({hourlyData}) => {
   
    let {state, dispatch} = useContext(WeatherContext);
    console.log("hour",state.hourly)
  return (
    <>
    chart 
    {/* <Line data={chartData} options={chartOptions} />; */}
    </>
  )
}

export default HourWiseData