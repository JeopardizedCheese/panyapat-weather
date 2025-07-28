import { useEffect, useState } from 'react'
import './App.css'
import type { CurrentWeatherData, HourlyData, DailyData } from '../types/weather';
import CurrentWeatherCard from './components/CurrentWeatherCard';
import HourlyForecast from './components/HourlyForecast';
import WeatherDetails from './components/WeatherDetails';
import { fetchWeatherData } from './utils/weatherAPI';
import SearchBar from './components/SearchBar';
import { useDebounce } from 'use-debounce';
import DailyForecast from './components/DailyForecast';

function App() {

  const [city, setCity] = useState('Bangkok');
  const [debouncedCity] = useDebounce(city, 500);
  const [currentWeather, setCurrentWeather] = useState<CurrentWeatherData | null>(null);
  const [hourlyForecast, setHourlyForecast] = useState<HourlyData[]>([]);
  const [dailyForecast, setDailyForecast] = useState<DailyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWeatherData = async () => {
      if (!debouncedCity.trim()) return;

      try {
        setLoading(true);
        setError(null);
        const data = await fetchWeatherData(debouncedCity);

        console.log('API Response:', debouncedCity, data)

        setCurrentWeather({
        location: `${data.location.name}, ${data.location.country}`,
        temperature: Math.round(data.current.temp_c),
        condition: data.current.condition.text,
        humidity: data.current.humidity,
        windSpeed: Math.round(data.current.wind_kph),
        pressure: data.current.pressure_in,
        visibility: data.current.vis_km,
        uvIndex: data.current.uv,
        feelsLike: Math.round(data.current.feelslike_c),
        });

        const today = data.forecast.forecastday[0];
        const currentHour = new Date().getHours();
        const nextHours = today.hour.slice(currentHour, currentHour + 6);

        const hourlyData = nextHours.map((hour: any, index: number) => ({
          time: index === 0 ? "Now" : new Date(hour.time).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          }),
          temp: Math.round(hour.temp_c),
          precipitation: hour.chance_of_rain,
        }));

        setHourlyForecast(hourlyData);

        const dailyData = data.forecast.forecastday.map((day: any) => ({
        day: new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
        high: Math.round(day.day.maxtemp_c),
        low: Math.round(day.day.mintemp_c),
        precipitation: day.day.daily_chance_of_rain,
      }));
      
      setDailyForecast(dailyData);

      } catch (err) {
        setError(`Failed to load weather data for ${debouncedCity}`);
        console.error('Weather API Error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadWeatherData();
  }, [debouncedCity]);

  const handleSearch = (newCity: string) => {
    setCity(newCity);
  };

  if (loading) return <div className='flex justify-center items-center min-h-screen'>Loading...</div>
  if (error) return <div className='flex justify-between items-center min-h-screen text-red-500'>Error: {error}</div>
  if (!currentWeather) return null

  return (
    <div className='min-h-screen bg-white text-black p-6'>
      <div className='max-w-6xl mx-auto'>

        {/*Search Bar for now*/}
        <SearchBar onSearch={handleSearch} />

        {/*Main Content Grid*/}
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
          {/*Current Weather - takes 2 columns, 2 rows*/}
          <div className='lg:col-span-2 lg:row-span-2'>
            <CurrentWeatherCard weather={currentWeather} />
          </div>
          {/*Hourly Forecast Grid*/}
          <div className='lg:col-span-2'>
            <HourlyForecast forecast={hourlyForecast} />
          </div>
          {/*Weather Details*/}
          <div className='lg:col-span-2'>
            <WeatherDetails weather={currentWeather} />
          </div>
          {/*Daily Forecast (5 days)*/}
          <div className='lg:col-span-4'>
            <DailyForecast forecast={dailyForecast}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
