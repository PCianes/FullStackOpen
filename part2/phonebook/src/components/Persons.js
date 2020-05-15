import React from "react";

const Persons = ({ personsFilter }) => {
  return personsFilter.map((person) => (
    <p key={person.name}>
      {person.name} <span>{person.number}</span>
    </p>
  ));
};

export default Persons;
