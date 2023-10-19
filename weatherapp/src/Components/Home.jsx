import React, { useEffect, useState } from 'react';
import cities from "./data.json";
import axios from "axios"
import { useContext } from 'react';
import { WeatherContext } from '../Context/WeatherContextProvider';
import WeekInfoCard from './WeekInfoCard/WeekInfoCard';
import Weatherdiv from './Weatherdiv';

const Home = () => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [currentData,setcurrentData] = useState([])

  const {state,dispatch} = useContext(WeatherContext)
  console.log("city",state.city)
//   const {city} = state

  console.log("city",state.city)
//   console.log("weather",state.city)
//   console.log("weather",state.city)

// var url = 'http://api.openweathermap.org/data/2.5/forecast/city';


//   const apikey="e669dd3cb285375346a90b725a4a14ac";
//   let lat = state.city && state.city.lat ? state.city.lat:"";
//   let long = state.city && state.city.lng ? state.city.lng:"";
//   let exclude = "hourly,minutely";


//   var url = `https://api.openweathermap.org/data/2.5/forcast?city=${state.city}lat=${lat}&lon=${long}&exclude=${exclude}&units=metric&lang=tr`;
// var url = `https://api.openweathermap.org/data/2.5/forecast?city=${state.city}&id=524901&APPID=e669dd3cb285375346a90b725a4a14ac`


  
// //   const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${apikey}`;
// const saveurl = makeUrl(url,keys)
// console.log("saveurl",saveurl)

// const APIKEY = "f56f24967aaf51182d1d4df628297c6d";
    let lat = state.city && state.city.lat ? state.city.lat : '';
    let long = state.city && state.city.lng ? state.city.lng : '';
    let exclude = 'hourly,minutely';
    // console.log("p",process.env.api)
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&appid=f56f24967aaf51182d1d4df628297c6d`
    // const url =`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&appid=${APIKEY}`
    // const url = `https://api.openweathermap.org/data/2.5/forecast?city=${state.city}&lat=${lat}&lon=${long}&exclude=${exclude}&id=524901&APPID=${APIKEY}`
    // const ULR =  `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&exclude=${exclude}&units=metric&lang=tr&appid=${APIKEY}`
    
    const fetchData = ()=>{
        axios(url).then((data)=>{
            console.log(data)
            console.log(data.data.current)
            let _daily = data.data.daily
            dispatch({
                type:'SET_DAILY',
                payload:_daily
            })
            
            //console.log('data',data.data)
        })
    }
    useEffect(()=>{
       fetchData();
       // eslint-disable-next-line
    }, [state.city])

  


  const handleChange = (e) => {
    const value = e.target.value.toLowerCase();
    // console.log("value",value)
    setInput(value);

    if (value.length > 0) {
      const matchingCities = cities.filter(city => {
        return city.city.toLowerCase().includes(value) || city.admin_name.toLowerCase().includes(value);
      });

    // Filter out null entries
  
      setSuggestions(matchingCities);
    } else {
      setSuggestions([]);
    }

  }

  const handleSuggestionClick = (city) => {
    setInput(`${city.city}, ${city.admin_name}`);
    setSuggestions([]);
  };

  const searchWeather = (e) =>{

    let value = input.split(",")[0]

    const inputcity = cities.filter((city)=>{
        return city.city==value
    })[0]

    dispatch({
        type:"SET_CITY",
        payload:inputcity,
    })
    // console.log("inputcity",inputcity)
  }



  return (
    <>
      <div id="search-container">
        <i className="fa-solid fa-location-dot fa-2x" />
        <input type="text" placeholder="enter a city..." value={input} onChange={handleChange} />
        <i className="fa fa-search fa-2x" onClick={searchWeather}/>
      </div>
      {suggestions.length > 0 && (
          <div className="suggestions">
            {/* <h1 style={{color:"red"}}>hello suggestion</h1> */}
            <ul>
              {suggestions.map((city, index) => (
                <li key={index} onClick={() => handleSuggestionClick(city)}>
                  {city.city}, {city.admin_name}
                </li>
              ))}
              <hr/>
            </ul>
          </div>
        )}
        <WeekInfoCard></WeekInfoCard>
        <Weatherdiv></Weatherdiv>
    </>
  );
}

export default Home;