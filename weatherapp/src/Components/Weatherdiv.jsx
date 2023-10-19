import React, { useContext } from 'react'
import { WeatherContext } from '../Context/WeatherContextProvider';
import dayjs from "dayjs";
import HourWiseData from './HourWiseData';


const Weatherdiv = () => {


  const { state: { city, current, hourly } } = useContext(WeatherContext);

  //   console.log("hourly",hourly)
  if (!current) return <div>Loading...</div>;


  function convertTime(timestamp) {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Add leading zero if minutes is less than 10
    const formattedMinutes = (minutes < 10 ? '0' : '') + minutes;

    // Determine if it's AM or PM
    const ampm = hours >= 12 ? 'pm' : 'am';

    // Convert hours from 24-hour format to 12-hour format
    const formattedHours = hours % 12 || 12;

    return `${formattedHours}.${formattedMinutes}${ampm}`;
  }

  const sunriseTimestamp = current.sunset;
  const sunsetTimestamp = current.sunrise;

  const sunriseTime = convertTime(sunriseTimestamp);
  const sunsetTime = convertTime(sunsetTimestamp);




  return (
    <>
      <div className='weatherdiv'>

        <div className='tempdetails'>
        <h1 className="weatherTemp">{Math.round(current.temp.max)}°C </h1>
        <img
          className="weatherIcon" alt="myit"
          src={`http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`}
        />
        </div>

        <HourWiseData></HourWiseData>

        <div className='twodiv'>
          <div className='leftdiv'>
            <h2>Pressure</h2>
            <h3>{current.pressure * 1013.25} hpa</h3>

          </div>
          <div className='rightdiv'>
            <h2>Humidity</h2>
            <h3>{current.humidity} %</h3>

          </div>
        </div>

        <div className='sundetails'>
          <div>
            <h2>Sunrise</h2>
            <h4>{sunriseTime}</h4>

          </div>

          <div>
            <h2>Sunset</h2>
            <h4>{sunsetTime}</h4>

          </div>
        </div>

        <div className='sunchart'>
          <img src="../images/sunchart.PNG" alt="SUN" />
        </div>

      </div>
    </>
  )
}

export default Weatherdiv