import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchPerson, setNewSearch] = useState("");
  const [personsFilter, setPersonsFilter] = useState(persons);

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
      setPersonsFilter(response.data);
    });
  }, []);

  const filterPersons = (e) => {
    const searchPerson = e.target.value;
    setNewSearch(searchPerson);
    const newPersons = persons.filter(
      (person) =>
        person.name.toLowerCase().search(searchPerson.toLowerCase()) !== -1
    );
    setPersonsFilter(newPersons);
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    setNewName("");
    setNewNumber("");
    const alreadyExists = persons.some((person) => person.name === newName);
    if (alreadyExists) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    const newPersons = persons.concat({ name: newName, number: newNumber });
    setPersons(newPersons);
    setPersonsFilter(newPersons);
  };
  const formData = {
    onFormSubmit,
    newName,
    setNewName,
    newNumber,
    setNewNumber,
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={searchPerson} onChange={filterPersons} />
      <h3>Add a new</h3>
      <PersonForm data={formData} />
      <h3>Numbers</h3>
      <Persons personsFilter={personsFilter} />
    </div>
  );
};

export default App;
