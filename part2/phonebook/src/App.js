import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import PhoneService from "./services/phonebook";

import "./App.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchPerson, setNewSearch] = useState("");
  const [personsFilter, setPersonsFilter] = useState(persons);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    PhoneService.getAll().then((returnedPersons) => {
      setPersons(returnedPersons);
      setPersonsFilter(returnedPersons);
    });
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setMessage(null);
    }, 10000);
  }, [message]);

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
    const currentPerson = persons.filter((person) => person.name === newName);
    if (currentPerson.length === 1) {
      if (
        window.confirm(
          `${currentPerson[0].name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        PhoneService.update(currentPerson[0].id, {
          name: newName,
          number: newNumber,
        })
          .then((returnedPerson) => {
            const newPersons = persons.map((person) =>
              person.id !== returnedPerson.id ? person : returnedPerson
            );
            setPersons(newPersons);
            setPersonsFilter(newPersons);
            setMessage({
              text: `Update ${returnedPerson.name}`,
              type: "success",
            });
          })
          .catch((err) => {
            setMessage({
              text: `${newName} was already removed from server`,
              type: "error",
            });
          });
      }
      return;
    }

    PhoneService.create({ name: newName, number: newNumber })
      .then((returnedPerson) => {
        const newPersons = persons.concat(returnedPerson);
        setPersons(newPersons);
        setPersonsFilter(newPersons);
        setMessage({ text: `Create ${newName}`, type: "success" });
      })
      .catch((error) => {
        setMessage({
          text: error.response.data.error,
          type: "error",
        });
      });
  };

  const deletePerson = ({ id, name }) => {
    if (window.confirm(`Delete ${name}?`)) {
      PhoneService.deletePerson(id)
        .then((response) => {
          const newPersons = persons.filter((person) => person.id !== id);
          setPersons(newPersons);
          setPersonsFilter(newPersons);
          setMessage({ text: `Delete ${name}`, type: "success" });
        })
        .catch((err) => {
          setMessage({
            text: `${name} was already removed from server`,
            type: "error",
          });
        });
    }
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
      <Notification message={message} />
      <Filter value={searchPerson} onChange={filterPersons} />
      <h3>Add a new</h3>
      <PersonForm data={formData} />
      <h3>Numbers</h3>
      <Persons personsFilter={personsFilter} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
