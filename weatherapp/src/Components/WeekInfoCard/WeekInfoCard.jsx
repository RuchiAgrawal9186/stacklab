import React, { useContext, useEffect, useState } from 'react'
import { WeatherContext } from '../../Context/WeatherContextProvider';
import SingleCard from '../SingleCard';
import "./WeekInfoCard.css"

const WeekInfoCard = () => {

    let {state, dispatch} = useContext(WeatherContext);
    const [selectedCard, setSelectedCard] = useState(0);
    //console.log('daily', daily, 'current',current, UseWeatherAppContext());
    const updateCurrent = ()=>{
        return (
            dispatch({
                type:'SET_CURRENT',
                payload:state.daily[selectedCard]
            })
        )
    }
   useEffect(() => {
        updateCurrent();
        // eslint-disable-next-line
      }, [state.daily, selectedCard]);
  return (
    <>
    <div className='cardlist'>

    {
                       state.daily && state.daily.length > 0 ? state.daily.map((item, index)=>{
                        if (index < 7){
                            return (
                                    <SingleCard onClick={()=>{
                                        setSelectedCard(index)
                                        updateCurrent();
                                    }} item={item} key={index} />
                                )
                        }
                        return '';
                            
                        }) : ''
                    }

    </div>
    </>
  )
}

export default WeekInfoCard