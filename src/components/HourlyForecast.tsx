import type { HourlyData} from "../../types/weather";

interface hourlyForecastProps {
    forecast: HourlyData[];
}

export default function HourlyForecast({ forecast } : hourlyForecastProps) {
    return (
        <div className="bg-white border border-gray-700 rounded-lg p-6">
            <h3 className="text-lg font-medium mb-4 text-gray-800">Hourly Forecast</h3>
            <div className="flex gap-4 overflow-x-auto pb-5">
                {forecast.map((hour, index) => (
                    <div key={index} className="text-center min-w-20">
                        <div className="text-sm text-gray-600 mb-2">{hour.time}</div>
                        <div className="text-lg font-medium mb-1">{hour.temp}°C</div>
                        <div className="text-xs text-cyan-600">🌧️{hour.precipitation}%</div>
                    </div>
                ))}
            </div>
        </div>
    );
}