const express = require('express');

const app = express();
const port = 3000;

app.use(express.static('public'));
app.set('view engine','ejs');
app.set('views','./views');

const userController = require('./controllers/userController');

app.get('/',userController.getAllUser);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })