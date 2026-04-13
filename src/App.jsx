import axios from 'axios';
import './App.css'
import { useState } from 'react';

function App() {

  const API_KEY = '45ed851c5d0141fd80d142625261204';
  const BASE_URL = 'http://api.weatherapi.com/v1'
  const [weatheData, setWeatherData] = useState(null);

  async function fetchWeather(e) {
    e.preventDefault();
    const cityName = e.target.city.value
    console.log(cityName);
    try {
      const res = await axios.get(`${BASE_URL}/current.json?key=${API_KEY}&q=${cityName}`)
      console.log(res.data)
      setWeatherData(res.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }

  return (
    <>
      <div className='w-full h-full'>
        <form onSubmit={fetchWeather}>
          <input
            type="text"
            name='city'
            placeholder='Enter city name'
            className='border p-2 m-6'
          />
          <button className='bg-red-500 text-white p-2 m-6'>Get Weather</button>
        </form>
        {weatheData && (
          <div className='m-6 p-4 text-3xl'>
            {weatheData.current.temp_c}°C
          </div>
        )}
      </div >
    </>
  )


}

export default App
