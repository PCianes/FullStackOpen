const express = require("express");
const app = express();

let persons = require("./db.json");

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
