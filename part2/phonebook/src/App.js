import React, { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchPerson, setNewSearch] = useState("");
  const [personsFilter, setPersonsFilter] = useState(persons);

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
