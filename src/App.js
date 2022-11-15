import './index.css';
import React, { useState } from 'react';

const api ={
  api:"1292b7f492b4a1367d40b86682b11d60 "
  
}


function App() {
  const[inputValue,setInputValue] = useState('')
  const [weather,setWeather] = useState({})
  function capitalize(s)
{
    return s && s[0].toUpperCase() + s.slice(1);
}
  function search(e){
    if(e.key === 'Enter'){
      fetch(`http://api.openweathermap.org/data/2.5/weather?q=${inputValue}&APPID=${api.api}`)
        .then(res=> res.json())
        .then(data =>{
          setWeather(data)
          setInputValue('')
          console.log(data)
        } )
         
    }
  }

  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`
  return (
    
    <div className={(typeof weather.main != "undefined")
    ? ((weather.main.temp > 283)
      ? "app hot" 
      : "app")
      :"app"}>
      <main>
        <div className='search-box'>
          <input type='text'
           className='search-input'
            placeholder='Search...'
              onChange={(e)=>setInputValue(capitalize(e.target.value))}
              value={inputValue}
              onKeyDown={search}
            />
        </div>
        {(typeof weather.main != "undefined") ? (
          <div className='container'>
        <div className='location-container'>
          <div className='location'>{weather.name},{weather.sys.country}</div>
          <div className='location-date'>{date}</div>
        </div>
        <div className='weather-container'>
          <div className='temperature'>
            {Math.round(weather.main.temp - 273)}°C
            <div className='name'>Temperature</div> 
          </div>
          <div className='weatherIs'>
            {weather.wind.speed}m/s
            <div className='name'>Wind speed</div> 
          </div>
          <div className='humidity'>
            {weather.main.humidity}%
            <div className='name'>Humidity</div> 
           
          </div>
         
        </div>
        </div>
        ) : ('')}
       
      </main>
    </div>
  );
}

export default App;
