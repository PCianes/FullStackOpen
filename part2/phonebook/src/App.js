import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const onFormSubmit = (e) => {
    e.preventDefault();
    setNewName("");
    const alreadyExists = persons.some((person) => person.name === newName);
    if (alreadyExists) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    setPersons(persons.concat({ name: newName }));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={onFormSubmit}>
        <div>
          name:{" "}
          <input value={newName} onChange={(e) => setNewName(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.name}>{person.name}</p>
      ))}
    </div>
  );
};

export default App;
