const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'Book'
});

connection.connect((error) => {
  if (error) {
    console.error('Khong ket noi duoc: ', error);
  } else {
    console.log('Da ket noi voi Database');
  }
});

connection.end();