import axios from 'axios';
import './App.css'


function App() {

  const API_KEY = '45ed851c5d0141fd80d142625261204';
  const BASE_URL = 'http://api.weatherapi.com/v1'

  async function fetchWeather() {
    try{
      const res = await axios.get(`${BASE_URL}/current.json?key=${API_KEY}&q=Dhaka`)
      console.log(res.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }

  return (
    <>
      Hello World!
      <button className='bg-red-500 text-white p-2 m-6' onClick={fetchWeather}>Get Weather</button>
    </>
  )

  
}

export default App
