const morgan = require('morgan')
const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/Person')

app.use(express.static('build'))
app.use(cors())
app.use(express.json())
morgan.token('custom', (req) => {
  return 'POST' === req.method ? JSON.stringify(req.body) : ' '
})
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :custom'
  )
)

app.get('/info', async (req, res) => {
  const count = await Person.estimatedDocumentCount({})
  const response = `
  <p>Phonebook has info for ${count} people</p>
  <p>${new Date()}</p>
  `
  res.send(response)
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons)
  })
})

app.get('/api/persons/:id', async (req, res, next) => {
  try {
    const person = await Person.findById(req.params.id)
    if (!person) {
      return res.sendStatus(404)
    }
    res.json(person)
  } catch (error) {
    next(error)
  }
})

app.post('/api/persons', async (req, res, next) => {
  const { name, number } = req.body
  if (!name || !number) {
    return res.status(400).json({
      error: 'The name or number is missing',
    })
  }
  const personExists = await Person.findOne({ name: name })
  if (personExists) {
    return res.status(400).json({
      error: 'The name already exists in the phonebook',
    })
  }
  const person = {
    name,
    number,
  }
  const newPerson = await new Person(person)
  try {
    await newPerson.save()
    res.json(newPerson)
  } catch (error) {
    next(error)
  }
})

app.put('/api/persons/:id', async (req, res, next) => {
  try {
    const { name, number } = req.body
    const person = {
      name,
      number,
    }
    const updatePerson = await Person.findByIdAndUpdate(req.params.id, person, {
      new: true,
    })
    res.json(updatePerson)
  } catch (error) {
    next(error)
  }
})

app.delete('/api/persons/:id', async (req, res, next) => {
  try {
    const personExists = await Person.findById(req.params.id)
    if (!personExists) {
      return res.status(400).json({
        error: 'The person not exists in the phonebook',
      })
    }
    await Person.findByIdAndRemove(req.params.id)
    res.json({ success: true })
  } catch (error) {
    next(error)
  }
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
