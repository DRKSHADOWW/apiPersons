
import { useState, useEffect } from "react"
import countriesServices from  "./services/Countries"
import {Search} from  "./components/Search"


const App = () => {

  const [countries, setCountries] = useState([]) 
  const[search, setSearch] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [weather, setWeather] = useState(null)

  useEffect(()=>{

    countriesServices
    .getAll()
    .then(response => {
      setCountries(response.data)
    })
  }, [])

  const filteredCountries = countries.filter(country => {
    return country.name?.common?.toLowerCase().includes(search.toLowerCase());
  })

  const handleSearch = (e) => {
    setSearch(e.target.value);
    const filteredCountry = filteredCountries[0];
    if (filteredCountry && filteredCountries.length === 1) {
      setSelectedCountry(filteredCountry);
    } else {
      setSelectedCountry(null);
    }
  }

  const handleSelectCountry = async (country) => {
    setSelectedCountry(country);
    const capital = country.capital;
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=YOUR_API_KEY_HERE`);
    const weatherData = response.data;
    setWeather(weatherData);
  }


 
  

 

  return  (
    <>
    <Search onChange={handleSearch} value={search} search={search}/>
    
    

    
    {selectedCountry ? (
      <div>
        <h2>{selectedCountry.name.common}</h2>
        <p>Capital: {selectedCountry.capital}</p>
        <p>Population: {selectedCountry.population.toLocaleString()}</p>
        <p>Region: {selectedCountry.region}</p>
        <p>Area: {selectedCountry.area} km²</p>
        <p>Language: {Object.values(selectedCountry.languages)[0]}</p>
        <img src={selectedCountry.flags.png} alt={selectedCountry.name.common} />


        {weather ? (
          <div>
            <h3>Weather in {selectedCountry.capital}</h3>
            <p>Temperature: {weather.main.temp} °C</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind speed: {weather.wind.speed} m/s</p>
            <p>Weather description: {weather.weather[0].description}</p>
          </div>
        ) : (
          <p>Loading weather data...</p>
        )}
      </div>
    ) : (
      filteredCountries.length > 10 ? (
        <p>Too many macthces: {filteredCountries.length} specify another filter</p>
      ) : (
        <ul>
        {filteredCountries.map(country => (
          <li key={country.id}>
            {country.name.common}
            <button onClick={() => setSelectedCountry(country)}  onClick2={() => handleSelectCountry(country)}>Ver detalles</button>
          </li>
        ))}
      </ul>
      )
    )}
  </>
  )
}
export default App