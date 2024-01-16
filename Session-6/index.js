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

//sign in
app.get('/signin', (req, res) => {
    res.render('signin')
})
app.post('/signin', (req, res) => {
    const {username, password} = req.body;
    const sqlsignin = "SELECT * FROM book.users WHERE username = ?"
    db.query(sqlsignin,[username],(err,ketqua)=>{
        if(err){
            console.error('Loi khong them duoc du lieu',err);
        }
        if (ketqua.length>0){
            const passwordcrypt = ketqua[0].password;
            const sosanh = bcrypt.compareSync(password,passwordcrypt);
            if(sosanh){
                res.redirect('/')
            }
            else{
                res.status(404).send("Khong dung mat khau")
            }
        }
        else{
            res.status(404).send("Khong co user nay")
        }
});
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})