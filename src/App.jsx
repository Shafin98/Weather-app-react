import axios from 'axios';
import './App.css'
import { useState } from 'react';

function App() {

  const API_KEY = '45ed851c5d0141fd80d142625261204';
  const BASE_URL = 'https://api.weatherapi.com/v1'
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchWeather(e) {
    e.preventDefault();
    const cityName = e.target.city.value.trim();
    if (!cityName) return;

    console.log(cityName);
    try {
      setIsLoading(true);
      setError(null);
      const res = await axios.get(`${BASE_URL}/current.json?key=${API_KEY}&q=${cityName}`);
      console.log(res.data);
      setWeatherData(res.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('City not found or network error. Please try again.');
      setIsLoading(false);
      setWeatherData(null);
    }
  }

  return (
    <div className="bg-dark-base min-h-screen text-light py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Search Form */}
        <form onSubmit={fetchWeather} className="max-w-2xl mx-auto mb-12">
          <div className="flex gap-3">
            <input
              type="text"
              name='city'
              placeholder='Enter city name'
              className='flex-1 px-4 py-3 rounded-xl border border-custom bg-card text-light placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-primary focus:ring-opacity-50 transition-all'
              required
            />
            <button
              type="submit"
              className='btn-accent px-8 py-3 rounded-xl font-semibold focus:outline-none focus:ring-2 focus:ring-accent-primary transition-all'
            >
              Get weather
            </button>
          </div>
        </form>

        {/* Loading State */}
        {isLoading && (
          <div className='text-center py-12'>
            <div className='inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-t-2 border-accent-primary mb-4'></div>
            <p className='text-xl text-light'>Loading weather data...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className='max-w-2xl mx-auto bg-card border border-custom rounded-lg p-4 text-center mb-8'>
            <p className='text-lg text-light'>{error}</p>
          </div>
        )}

        {/* Weather Data - Two Column Layout */}
        {weatherData && !isLoading && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* LEFT COLUMN - CURRENT CONDITIONS */}
            <div className="lg:col-span-1">
              <div className="card-bg rounded-2xl p-8">
                {/* Section Header */}
                <p className="text-xs uppercase tracking-widest text-muted mb-6 font-semibold">Current Conditions</p>

                {/* Location */}
                <h2 className="text-3xl font-bold mb-1 text-light">
                  {weatherData.location.name}
                </h2>
                <p className="text-sm text-muted mb-8">
                  {weatherData.location.country}
                </p>

                {/* Weather Icon */}
                <div className="text-center mb-6">
                  <img
                    src={`https:${weatherData.current.condition.icon}`}
                    alt={weatherData.current.condition.text}
                    className="w-20 h-20 mx-auto"
                  />
                </div>

                {/* Temperature */}
                <p className="text-6xl font-bold text-accent-primary mb-2 text-center">{Math.round(weatherData.current.temp_c)}°C</p>
                
                {/* Weather Condition */}
                <p className="text-lg text-light text-center mb-4">{weatherData.current.condition.text}</p>

                {/* Last Updated */}
                <p className="text-xs text-muted text-center mb-8">
                  Last updated at {new Date(weatherData.location.localtime).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>

                {/* Three Small Cards - Feels Like, Wind, Humidity */}
                <div className="grid grid-cols-3 gap-3">
                  {/* Feels Like */}
                  <div className="bg-dark-base border border-custom rounded-lg p-3">
                    <p className="text-xs text-muted mb-2">Feels like</p>
                    <p className="text-xl font-bold text-light">{Math.round(weatherData.current.feelslike_c)}°C</p>
                  </div>

                  {/* Wind */}
                  <div className="bg-dark-base border border-custom rounded-lg p-3">
                    <p className="text-xs text-muted mb-2">Wind</p>
                    <p className="text-xl font-bold text-light">{weatherData.current.wind_kph} kph</p>
                  </div>

                  {/* Humidity */}
                  <div className="bg-dark-base border border-custom rounded-lg p-3">
                    <p className="text-xs text-muted mb-2">Humidity</p>
                    <p className="text-xl font-bold text-light">{weatherData.current.humidity}%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* CENTER - TIMESTAMP */}
            <div className="lg:col-span-1 flex items-center justify-center">
              <div className="bg-card border border-custom rounded-full px-6 py-4 text-center">
                <p className="text-sm text-light font-mono">
                  {new Date(weatherData.location.localtime).toISOString().slice(0, 16).replace('T', ' ')}
                </p>
              </div>
            </div>

            {/* RIGHT COLUMN - MORE DETAILS */}
            <div className="lg:col-span-1">
              <div className="card-bg rounded-2xl p-8">
                {/* Section Header */}
                <p className="text-xs uppercase tracking-widest text-muted mb-6 font-semibold">More Details</p>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-3 space-y-0">
                  {/* Feels Like - duplicate for consistency */}
                  <div className="bg-dark-base rounded-lg p-4">
                    <p className="text-xs text-muted mb-2">Feels like</p>
                    <p className="text-lg font-bold text-light">{Math.round(weatherData.current.feelslike_c)}°C</p>
                  </div>

                  {/* Humidity */}
                  <div className="bg-dark-base rounded-lg p-4">
                    <p className="text-xs text-muted mb-2">Humidity</p>
                    <p className="text-lg font-bold text-light">{weatherData.current.humidity}%</p>
                  </div>

                  {/* Wind */}
                  <div className="bg-dark-base rounded-lg p-4">
                    <p className="text-xs text-muted mb-2">Wind</p>
                    <p className="text-lg font-bold text-light">{weatherData.current.wind_kph} kph</p>
                  </div>

                  {/* Gusts */}
                  <div className="bg-dark-base rounded-lg p-4">
                    <p className="text-xs text-muted mb-2">Gusts</p>
                    <p className="text-lg font-bold text-light">{weatherData.current.gust_kph} kph</p>
                  </div>

                  {/* Visibility */}
                  <div className="bg-dark-base rounded-lg p-4">
                    <p className="text-xs text-muted mb-2">Visibility</p>
                    <p className="text-lg font-bold text-light">{weatherData.current.vis_km} km</p>
                  </div>

                  {/* Pressure */}
                  <div className="bg-dark-base rounded-lg p-4">
                    <p className="text-xs text-muted mb-2">Pressure</p>
                    <p className="text-lg font-bold text-light">{weatherData.current.pressure_mb} mb</p>
                  </div>

                  {/* Cloud Cover */}
                  <div className="bg-dark-base rounded-lg p-4">
                    <p className="text-xs text-muted mb-2">Cloud cover</p>
                    <p className="text-lg font-bold text-light">{weatherData.current.cloud}%</p>
                  </div>

                  {/* UV Index */}
                  <div className="bg-dark-base rounded-lg p-4">
                    <p className="text-xs text-muted mb-2">UV index</p>
                    <p className="text-lg font-bold text-light">{weatherData.current.uv}</p>
                  </div>

                  {/* Precipitation */}
                  <div className="bg-dark-base rounded-lg p-4">
                    <p className="text-xs text-muted mb-2">Precipitation</p>
                    <p className="text-lg font-bold text-light">{weatherData.current.precip_mm} mm</p>
                  </div>

                  {/* Dew Point */}
                  <div className="bg-dark-base rounded-lg p-4">
                    <p className="text-xs text-muted mb-2">Dew point</p>
                    <p className="text-lg font-bold text-light">{Math.round(weatherData.current.dewpoint_c)}°C</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!weatherData && !isLoading && !error && (
          <div className="max-w-2xl mx-auto text-center py-20">
            <p className="text-lg text-muted mb-2">Search any city and get a clean snapshot of current conditions,</p>
            <p className="text-lg text-muted">how it feels outside, and the numbers behind the forecast.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
