// importing base sequelize class and using it to create a new connection to DB.
// new Sequelize() function accepts db name, username, and password as parameters
// exporting connection

// import the Sequelize constructor from the library
const Sequelize = require('sequelize');

require('dotenv').config();

let sequelize;

// create connection to our db, passing in MySQL information for user and pass
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
  });
}



module.exports = sequelize;

