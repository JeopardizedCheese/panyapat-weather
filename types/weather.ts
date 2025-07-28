export interface CurrentWeatherData {
    location: string;
    temperature: number;
    condition: string;
    humidity: number;
    windSpeed: number;
    pressure: number;
    visibility: number;
    uvIndex: number;
    feelsLike: number;
}

export interface HourlyData {
    time: string;
    temp: number;
    precipitation: number;
}

export interface DailyData {
    day: string;
    high: number;
    low: number;
    precipitation: number;
}