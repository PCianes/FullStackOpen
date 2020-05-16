import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Country from "./components/Country";

function App() {
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [countriesFilter, setCountriesFilter] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

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
    if (countriesFilter.length === 0) return;
    if (countriesFilter.length === 1) {
      return <Country data={countriesFilter[0]} />;
    }
    return countriesFilter.map((country) => <p>{country.name}</p>);
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
    </>
  );
}

export default App;
