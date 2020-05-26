require('dotenv').config()

const SECRET = process.env.SECRET
const PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI

if (process.env.NODE_ENV === 'tests') {
  MONGODB_URI = process.env.TEST_MONGODB_URI
}

module.exports = {
  SECRET,
  MONGODB_URI,
  PORT,
}
