const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    PORT: process.env.PORT,
    SALT: bcrypt.genSaltSync(10),
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    DB_SYNC: process.env.DB_SYNC,
    username: process.env.username,
    password: process.env.password
}