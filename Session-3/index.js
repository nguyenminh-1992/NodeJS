const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
  })
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
// C R U D

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'Testing_System_2'
});

app.use(bodyParser.json())
//READ
app.get('/account', (req,res)=>{
    const sqlhienthi = "SELECT * FROM Testing_System_2.Account";
    connection.query(sqlhienthi,(err,ketqua)=>{
        if(err) throw err;
        res.json(ketqua);
    })
})

//CREATE
app.post('/adddepart', (req,res)=>{
    const depart = "ASP.Net";
    const sqlcreate = "INSERT INTO Department(DepartmentName) VALUES (?)";
    connection.query(sqlcreate,[depart],(err,ketqua)=>{
        if(err) throw err;
        res.status(201).send("Da them department vao DB");
    })
})

//DELETE
app.delete('/deldepart/:id', (req,res)=>{
    const id = req.params.id;
    const sqldelete = "DELETE FROM Department WHERE DepartmentID=?";
    connection.query(sqldelete,[id],(err,ketqua)=>{
        if(err) throw err;
        res.send("Da xoa du lieu trong Depart")
    })
})
//UPDATE
app.put('/updatedepart/:id', (req,res)=>{
    const name='ASP.Net';
    const id = req.params.id;
    const sqlupdate = "UPDATE Department SET DepartmentName=? WHERE DepartmentID=?";
    connection.query(sqlupdate,[name,id],(err,ketqua)=>{
        if(err) throw err;
        res.send("Da sua du lieu trong Depart")
    })
})
