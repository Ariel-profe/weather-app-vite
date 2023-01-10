import { AppWeather } from './components/AppWeather';
import { WeatherProvider } from './context/WeatherProvider';

function App() {
 
  return (
    <WeatherProvider>
      <header>
        <h1>weather finder</h1>
      </header>
      <AppWeather />
    </WeatherProvider>
  )
}

export default App
