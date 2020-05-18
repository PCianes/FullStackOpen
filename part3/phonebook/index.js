const { v4: uuidv4 } = require("uuid");
const morgan = require("morgan");
const express = require("express");
const app = express();

app.use(express.json());
app.use(morgan("tiny"));

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

app.post("/api/persons", (req, res) => {
  const { name, number } = req.body;
  if (!name || !number) {
    return res.status(400).json({
      error: "The name or number is missing",
    });
  }
  const personExists = persons.find((person) => person.name === name);
  if (personExists) {
    return res.status(400).json({
      error: "The name already exists in the phonebook",
    });
  }
  const person = {
    id: uuidv4(),
    name,
    number,
  };
  persons.push(person);
  res.json(person);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = persons.find((person) => person.id === id);
  if (!person) {
    return res.sendStatus(404);
  }
  persons = persons.filter((person) => person.id !== id);
  res.json(person);
});

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
