import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";

const Weather = ({ country }) => {
   const [weat, setWeat] = useState([]);

   useEffect(() => {
      axios
         .get(
            `http://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
         )
         .then((res) => {
            setWeat([res.data.main.temp, res.data.wind.speed]);
         })
         .catch((err) => console.error(err));
   }, [country]);

   return (
      <div>
         <p>
            <b>Temperature</b>: {weat[0]} ºC
         </p>
         <p>
            <b>Wind</b>: {weat[1]} km/h
         </p>
      </div>
   );
};

function App() {
   const [countries, setCountries] = useState([]);
   const [search, setSearch] = useState("");

   const Result = ({ countries }) => {
      if (countries.length === 1) {
         const { capital, flags, languages, population, name } = countries[0];
         return (
            <div>
               <h2>{name.common}</h2>
               <p>
                  <b>Capital</b>: {capital[0]}
               </p>
               <p>
                  <b>Population</b>:{" "}
                  {population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
               </p>
               <h3>Languages</h3>
               <ul>
                  {Object.values(languages).map((lang, i) => (
                     <li key={i}>{lang}</li>
                  ))}
               </ul>
               <img src={flags.png} alt={`flag of ${name.common}`} />
               <Weather country={name.common} />
            </div>
         );
      }
      if (countries.length > 10) {
         return (
            <div>
               <p>Too many matches, specify another filter</p>
            </div>
         );
      }
      return (
         <div>
            {countries.map((country) => (
               <p key={country.name.common}>
                  {country.name.official}{" "}
                  <button
                     type="button"
                     onClick={() => setSearch(country.name.common)}
                  >
                     Show
                  </button>
               </p>
            ))}
         </div>
      );
   };

   const handleChange = (e) => {
      e.preventDefault();
      setSearch(e.target.value);
   };

   useEffect(() => {
      if (search.length > 2) {
         axios
            .get(`https://restcountries.com/v3.1/name/${search}`)
            .then((res) => {
               setCountries(res.data);
            })
            .catch((err) => console.error(err));
      }
   }, [search]);

   return (
      <div>
         <label htmlFor="search">Search country:</label>
         <input type="text" value={search} onChange={handleChange} />
         <Result countries={countries} />
      </div>
   );
}

export default App;
