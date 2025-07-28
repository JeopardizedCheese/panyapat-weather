import type { DailyData } from "../../types/weather";
import { Sun, Cloud, CloudRain } from 'lucide-react';

interface DailyForeCastProps {
    forecast: DailyData[];
}

const getWeatherIcon = (precipitation: number) => {
  if (precipitation > 70) return CloudRain;
  if (precipitation > 40) return Cloud;
  if (precipitation > 10) return Sun;
  return Sun;
};

export default function DailyForecast( { forecast }: DailyForeCastProps) {
    return (
        <div className="bg-white border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4 text-gray-800">5-Day Forecast</h3>
            <div className="grid grid-cols-5 gap-4">
                {forecast.map((day, index) => {
                    const WeatherIcon = getWeatherIcon(day.precipitation);

                    return (
                        <div
                        key={index}
                        className="text-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div className="text-sm text-gray-600 mb-3">{day.day}</div>
                            <WeatherIcon className="w-8 h-8 mx-auto mb-3 text-blue-500" />
                            <div className="space-y-1">
                                <div className="font-medium text-gray-900">{day.high}°C</div>
                                <div className="text-sm text-gray-500">{day.low}°C</div>
                                <div className="text-xs text-blue-500">{day.precipitation}%</div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}