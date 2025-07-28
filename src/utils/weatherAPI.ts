const API_KEY = import.meta.env.VITE_WEATHER_KEY;
const BASE_URL = "https://api.weatherapi.com/v1"

export const fetchWeatherData = async (city: string) => {
    const response = await fetch(
        `${BASE_URL}/forecast.json?key=${API_KEY}&q=${city}&days=5&aqi=no`
    );

    if (!response.ok) {
        throw new Error ('Weather data not found');
    }

    return response.json();
};