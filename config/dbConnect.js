require('dotenv').config();
const mysql = require('mysql');

const dbConnect = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

dbConnect.connect((err) => {
  if (err) {
    console.error('Error connecting to database', err);
  } else {
    console.log('Connected to database successfully');
  }
});

module.exports = dbConnect;
