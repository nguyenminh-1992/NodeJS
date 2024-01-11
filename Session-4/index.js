const express = require('express');
const mysql = require('mysql2');
const ejs = require('ejs');
const bodyParser = require('body-parser');
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
    database: 'Testing_System_2'
})

// db.connect((err)=>{
//     if(err){
//         console.error('Khong ket noi duoc',err);
//         throw err;
//     }
//     console.log('Da ket noi duoc toi Mysql');
// });

//Read data
app.get('/', (req, res) => {
  const sqlhienthi = "SELECT * FROM Testing_System_2.Account";
  db.query(sqlhienthi, (err, ketqua)=>{
    if(err){
        console.error('Loi khog truy van duoc',err);
        res.send("Loi khong truy van");
    }
    else{
        res.render('index',{account : ketqua});
    }
  }); 
});

// create data

app.get('/addaccount', (req,res)=>{
    res.render('addaccount');
})

app.post('/addaccount', (req,res)=>{
    const {email,username,fullname,departid,posid,date} = req.body;
    const sqlcreate = "INSERT INTO `Account`(Email,Username,FullName,DepartmentID,PositionID,CreateDate)VALUES (?,?,?,?,?,?)";
    db.query(sqlcreate,[email,username,fullname,departid,posid,date],(err,ketqua)=>{
        if(err){
            console.error('Loi khong them duoc du lieu',err);
        }
        else{
            res.redirect('/');
        }
    })
})

// delete data
app.get('/delaccount/:id', (req,res)=>{
    const id = req.params.id;
    const sqldelete = "DELETE FROM Account Where AccountID = ?";
    db.query(sqldelete,[id],(err,ketqua)=>{
        if(err){
            console.error('Loi khong xoa duoc du lieu',err);
        }
        else{
            res.redirect('/');
        }
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})