import { useWeather } from "../hooks/useWeather";
import { WeatherResponse } from '../interfaces/WeatherResponse';

export const Result = () => {

    const { result } = useWeather();

    const {name, main} = result as WeatherResponse;

    // Kelvin degrees
    const kelvin = 273.15;

  return (
    <div className="container weather">
        <h2>The weather in {name} is: </h2>

        <p>
            { (main.temp - kelvin).toFixed() } <span>&#x2103;</span>
        </p>
        <div className="temp_min_max">
            <p>
                Min: { (main.temp_min - kelvin).toFixed() } <span>&#x2103;</span>
            </p>
            <p>
                Max: { (main.temp_max - kelvin).toFixed() } <span>&#x2103;</span>
            </p>
        </div>
    </div>
  )
}
