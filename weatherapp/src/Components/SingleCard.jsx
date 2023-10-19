import React from 'react'
import dayjs from "dayjs";

const SingleCard = ({item, onClick}) => {

    const weekdayIndex = dayjs.unix(item.dt).day();
    const WEEKDAYS = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
  return (
    <>
    <div key={item.moonrise} onClick={onClick} className='card'>
             <h3>{WEEKDAYS[weekdayIndex].slice(0, 3)}</h3>
             <h4>{Math.round(item.temp.max)}°C</h4>

                <img className="day-icon"  alt="rohit"
                src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                        />
                <h4>{item.weather[0].main}</h4>
            </div>
    </>
  )
}

export default SingleCard