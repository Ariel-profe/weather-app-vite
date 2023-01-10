import { ChangeEvent, createContext, FC, ReactElement, useState } from "react";
import axios from 'axios';
import { WeatherResponse } from "../interfaces/WeatherResponse";

interface ContextProps {
    search: {city: string, country: string};
    searchData: (e: any) => void;
    consultWeather: (data: any) => void;
    result: WeatherResponse | undefined;
    loading: boolean;
    error: boolean;
}

export const WeatherContext = createContext( {} as ContextProps );

interface Props{
    children: ReactElement[];
}

export const WeatherProvider:FC<Props> = ({children}) => {    

    const [search, setSearch] = useState({
        city: '',
        country: ''
    });

    const [result, setResult] = useState<WeatherResponse | undefined>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const searchData = (e:ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        setSearch({
            ...search,
            [e.target.name] : e.target.value
        })
    };

    const consultWeather = async(formData:{city: string, country: string}) => {
        setLoading(true);
        setError(false);  
        try {
            const {city, country} = formData;   
            
            const appId = import.meta.env.VITE_WEATHER_API_KEY;

            const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&limit=1&appid=${appId}`

            const {data} = await axios(url);

            const {lat, lon} = data[0]
            
            const urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`

            const {data : weather} = await axios(urlWeather);

            setResult(weather);
            
        } catch (error) {
            console.log(error);
            setError(true);  
        }finally{
            setLoading(false);
        }
    }

    return (
        <WeatherContext.Provider 
            value={{
                search,
                searchData,
                consultWeather,
                result,
                loading,
                error
            }}>
            {children}
        </WeatherContext.Provider>
    )
};