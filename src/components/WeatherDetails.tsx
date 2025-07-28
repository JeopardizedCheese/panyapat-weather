import type { CurrentWeatherData } from "../../types/weather";
import { Thermometer, Droplets, Wind, Gauge, Eye, Sun } from "lucide-react";

interface WeatherDetailsProps {
    weather: CurrentWeatherData
}

export default function WeatherDetails({ weather }: WeatherDetailsProps) {
    const weatherMetrics = [
        { label: "Feels Like", value: `${weather.feelsLike}°C`, icon: Thermometer, color: "text-orange-400" },
        { label: "Humidity", value: `${weather.humidity}%`, icon: Droplets, color: "text-blue-400" },
        { label: "Wind", value: `${weather.windSpeed} km/h`, icon: Wind, color: "text-green-400" },
        { label: "Pressure", value: `${weather.pressure} in`, icon: Gauge, color: "text-purple-400" },
        { label: "Visibility", value: `${weather.visibility} km`, icon: Eye, color: "text-cyan-400" },
        { label: "UV Index", value: weather.uvIndex.toString(), icon: Sun, color: "text-yellow-400" },
    ];

    return (
        <div className="bg-white border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4 text-gray-800">Weather Details</h3>
            <div className="grid grid-cols-2 gap-4">
                {weatherMetrics.map((metric, index) => (
                    <div key={index} className="flex items-center gap-3">
                        <metric.icon className={`w-5 h-5 ${metric.color}`} />
                        <div>
                            <div className="text-sm text-gray-600">{metric.label}</div>
                            <div className="font-medium text-gray-900">{metric.value}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}