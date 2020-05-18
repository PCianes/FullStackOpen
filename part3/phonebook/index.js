const express = require("express");
const app = express();

let { persons } = require("./db.json");

app.get("/info", (req, res) => {
  const response = `
  <p>Phonebook has info for ${persons.length} people</p>
  <p>${new Date()}</p>
  `;
  res.send(response);
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  if (!person) {
    return res.sendStatus(404);
  }
  res.json(person);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  if (!person) {
    return res.sendStatus(404);
  }
  persons = persons.filter((person) => person.id !== id);
  res.json(person);
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
