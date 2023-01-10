import { FormEvent, useState } from 'react';
import { useWeather } from "../hooks/useWeather"

export const Form = () => {

    const [alert, setAlert] = useState('');

    const {search, searchData, consultWeather} = useWeather();
    const {city, country} = search;


    const handleSubmit = (e:FormEvent) => {
        e.preventDefault();

        if(Object.values(search).includes('')){
            setAlert('All fields are required');
            
            setTimeout(() => {
                setAlert('')
            }, 2500);

            return;
        }

        consultWeather(search);
    };

  return (
    <div className="container">
        {alert && <p className='alert'>{alert}</p>}
        <form
            onSubmit={handleSubmit}
        >
            <div className="field">
                <label htmlFor="city">City</label>
                <input
                    id="city"
                    type="text" 
                    name='city'
                    value={city}
                    onChange={searchData}
                />
            </div>
            <div className="field">
                <label htmlFor="country">Country</label>
                <select
                    id="country"
                    name='country'
                    value={country}
                    onChange={searchData}
                >
                    <option value=""> -- Select a country --</option>
                    <option value="US">United States</option>
                    <option value="MX">Mexico</option>
                    <option value="AR">Argentina</option>
                    <option value="CO">Colombia</option>
                    <option value="CR">Costa Rica</option>
                    <option value="ES">Espana</option>
                    <option value="PE">Peru</option>
                </select>
            </div>
                    <input type="submit" value="check weather" />
        </form>

    </div>
  )
}
