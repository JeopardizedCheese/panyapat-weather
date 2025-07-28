import type { CurrentWeatherData } from "../../types/weather"
import { MapPin, Zap, Sun, Cloud, CloudRain, CloudSnow, CloudDrizzle, CloudFog } from "lucide-react";


interface CurrentWeatherCardProps {
    weather: CurrentWeatherData;
}


const getWeatherIcon = (condition: string) => {
    const conditionLower = condition.toLowerCase();

    if (conditionLower.includes('sunny') || conditionLower.includes('clear')) {
        return Sun;
    } else if (conditionLower.includes('partly cloudy') || conditionLower.includes('cloudy')) {
        return Cloud;
    } else if (conditionLower.includes('rain') || conditionLower.includes('shower')) {
        return CloudRain;
    } else if (conditionLower.includes('drizzle')) {
        return CloudDrizzle;
    } else if (conditionLower.includes('snow')) {
        return CloudSnow;
    } else if (conditionLower.includes('thunder') || conditionLower.includes('storm')) {
        return Zap;
    } else if (conditionLower.includes('mist') || conditionLower.includes('fog')) {
        return CloudFog;
    } else {
    return Cloud; // default
  }
};

export default function CurrentWeatherCard({ weather }: CurrentWeatherCardProps) {
    
    const WeatherIcon = getWeatherIcon(weather.condition);
    
    return (
        <div className="bg-white border border-gray-700 rounded-lg h-full">
            <div className="p-8 h-full flex flex-col justify-between">
                <div>
                    <div className="flex items-center gap-2 text-black mb-6">
                        <MapPin className="w-5 h-5" />
                        <span className="text-lg">{weather.location}</span>
                    </div>
                    
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <div className="text-7xl font-thin mb-2">{weather.temperature}°C</div>
                            <div className="text-xl text-black">{weather.condition}</div>
                        </div>
                        <WeatherIcon className="w-32 h-32 text-yellow-500" />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gray-100 rounded-lg">
                        <div className="text-2xl font-light">{weather.feelsLike}°C</div>
                        <div className="text-sm text-gray-600">Feels like</div>
                    </div>
                    <div className="text-center p-4 bg-gray-100 rounded-lg">
                        <div className="text-2xl font-light text-cyan-400">85%</div>
                        <div className="text-sm text-gray-600">Chance of rain</div>
                    </div>
                </div>
            </div>
        </div>
    )
}