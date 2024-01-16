const express = require('express');
const mysql = require('mysql2');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt')
const app = express();
const port = 3000;

app.use(express.static('public'));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'book'
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//sign up
app.get('/signup', (req, res) => {
    res.render('signup')
  })

app.post('/signup', (req, res) => {
    const {username, password} = req.body;
    const passwordcrypt = bcrypt.hashSync(password,10);
    const sqlsignup = "INSERT INTO `Users`(username,password)VALUES (?,?)";
    db.query(sqlsignup,[username,passwordcrypt],(err,ketqua)=>{
        if(err){
            console.error('Loi khong them duoc du lieu',err);
        }
        else{
            res.redirect('/');
        }
    })
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})