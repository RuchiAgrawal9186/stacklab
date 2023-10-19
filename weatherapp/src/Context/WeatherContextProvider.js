import React, { useReducer } from 'react'
import { WeartherReducer } from './Reducer'

export const WeatherContext = React.createContext()


const WeatherContextProvider = (props) => {

    const [state,dispatch] = useReducer(WeartherReducer,{
        city:"",
        current:"",
        daily:""
    })


  return (
    <WeatherContext.Provider value = {{state,dispatch}}>
        {props.children}
    </WeatherContext.Provider>
  )
}

export default WeatherContextProvider