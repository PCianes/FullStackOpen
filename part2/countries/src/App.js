import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Country from "./components/Country";

function App() {
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [countriesFilter, setCountriesFilter] = useState([]);
  const [showCountry, setShowCountry] = useState({});

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  useEffect(() => {
    setShowCountry(
      countriesFilter.length === 1 ? { ...countriesFilter[0] } : {}
    );
  }, [countriesFilter]);

  const searchCountry = (e) => {
    setCountry(e.target.value);
    setCountriesFilter(
      countries.filter(
        (country) =>
          country.name.toLowerCase().search(e.target.value.toLowerCase()) !== -1
      )
    );
  };

  const showCountries = () => {
    if (countriesFilter.length <= 1) return;
    return countriesFilter.map((country) => (
      <p key={country.name}>
        {country.name}
        <button onClick={() => setShowCountry(country)}>show</button>
      </p>
    ));
  };

  return (
    <>
      <p>
        find countries{" "}
        <input value={country} name="country" onChange={searchCountry} />
      </p>
      {countriesFilter.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : (
        showCountries()
      )}
      {showCountry.name && <Country data={showCountry} />}
    </>
  );
}

export default App;
