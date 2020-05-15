import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "999-778866" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const onFormSubmit = (e) => {
    e.preventDefault();
    setNewName("");
    setNewNumber("");
    const alreadyExists = persons.some((person) => person.name === newName);
    if (alreadyExists) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    setPersons(persons.concat({ name: newName, number: newNumber }));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={onFormSubmit}>
        <div>
          name:
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            autoFocus
          />
        </div>
        <div>
          number:
          <input
            value={newNumber}
            onChange={(e) => setNewNumber(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.name}>
          {person.name} <span>{person.number}</span>
        </p>
      ))}
    </div>
  );
};

export default App;
