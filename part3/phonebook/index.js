const express = require("express");
const app = express();

let data = require("./db.json");

app.get("/api/persons", (req, res) => {
  res.json(data.persons);
});

app.get("/info", (req, res) => {
  const response = `
  <p>Phonebook has info for ${data.persons.length} people</p>
  <p>${new Date()}</p>
  `;
  res.send(response);
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
