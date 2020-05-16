import React from "react";

const Country = ({ data: { name, capital, population, flag, languages } }) => {
  return (
    <>
      <h1>{name}</h1>
      <p>capital {capital}</p>
      <p>population {population}</p>
      <ul>
        {languages.map((language) => (
          <li>{language.name}</li>
        ))}
      </ul>
      <img src={flag} alt={name} width="100px" />
    </>
  );
};

export default Country;
